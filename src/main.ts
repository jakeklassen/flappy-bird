import spriteSheetUrl from "#/assets/image/spritesheet.png";
import { BoxCollider } from "#/components/box-collider";
import { CircleCollider } from "#/components/circle-collider";
import { SpriteAnimation } from "#/components/sprite-animation";
import { SpriteAnimationDetails } from "#/components/sprite-animation-details";
import { SpriteData } from "#/components/sprite-data";
import { Vector2d } from "#/components/vector2d";
import { config } from "#/config";
import { Bird } from "#/entities/bird";
import { Ground } from "#/entities/ground";
import { PipeManager } from "#/entities/pipe-manager";
import { ScoreManager } from "#/entities/score-manager";
import { Game, GameState } from "#/game";
import { loadImage } from "#/lib/asset-loader";
import { circleRectangleIntersects } from "#/lib/collision";
import { spriteMap } from "#/sprite-map";

const spriteSheet = await loadImage(spriteSheetUrl);
const game = new Game();

const canvas = document.querySelector("canvas");
if (canvas == null) {
  throw new Error("Could not find canvas element");
}

canvas.width = config.gameWidth;
canvas.height = config.gameHeight;

const context = canvas.getContext("2d");

if (context == null) {
  throw new Error("Could not obtain 2d context");
}

context.imageSmoothingEnabled = false;

// Add event listener to trigger bird flap
canvas.addEventListener("click", () => {
  switch (game.state) {
    case GameState.Title: {
      game.state = GameState.Playing;
      bird.flap();
      pipeManager.start();

      break;
    }

    case GameState.Playing: {
      bird.flap();

      break;
    }

    case GameState.GameOver: {
      game.reset();
      bird.reset();
      ground.start();
      pipeManager.reset();
      scoreManager.reset();

      break;
    }
  }
});

window.addEventListener("keypress", (event) => {
  if (event.code === "KeyD") {
    game.debug = !game.debug;
  }
});

const ground = new Ground({
  boxCollider: new BoxCollider(
    0,
    0,
    spriteMap.ground.width,
    spriteMap.ground.height,
  ),
  game,
  position: new Vector2d(0, config.gameHeight - spriteMap.ground.height),
  spriteData: spriteMap.ground,
  spriteSheet: spriteSheet,
  scrollSpeed: 120,
});

const bird = new Bird({
  game,
  spriteSheet: spriteSheet,
  position: new Vector2d(config.gameWidth / 4, config.gameHeight / 2),
  spriteData: new SpriteData(
    spriteMap.bird.idle.sourceX,
    spriteMap.bird.idle.sourceY,
    spriteMap.bird.idle.width,
    spriteMap.bird.idle.height,
  ),
  flapAnimation: new SpriteAnimation(
    new SpriteAnimationDetails(
      spriteMap.bird.animations.flap.sourceX,
      spriteMap.bird.animations.flap.sourceY,
      spriteMap.bird.animations.flap.width,
      spriteMap.bird.animations.flap.height,
      spriteMap.bird.animations.flap.frameWidth,
      spriteMap.bird.animations.flap.frameHeight,
    ),
    0.3,
  ),
  circlCollider: new CircleCollider(0, 0, 12),
});

const pipeManager = new PipeManager({
  game,
  spriteMap,
  spriteSheet,
});

const scoreManager = new ScoreManager({
  config,
  spriteMap,
  spriteSheet,
});

let last = performance.now();

/**
 * The game loop.
 */
const frame = (hrt: DOMHighResTimeStamp) => {
  const dt = Math.min(1000, hrt - last) / 1000;

  context.clearRect(0, 0, canvas.width, canvas.height);

  pipeManager.update(dt);
  ground.update(dt);
  bird.update(dt);

  const didBirdHitGround = circleRectangleIntersects(
    bird.position.x + bird.circleCollider.offsetX,
    bird.position.y + bird.circleCollider.offsetY,
    bird.circleCollider.radius,
    ground.position.x + ground.boxCollider.offsetX,
    ground.position.y + ground.boxCollider.offsetY,
    ground.boxCollider.width,
    ground.boxCollider.height,
  );

  let didBirdHitPipe = false;
  for (const pipe of pipeManager.pipes) {
    didBirdHitPipe = false;

    const pipeRectangleColliderY =
      pipe.type === "top" ? 0 : pipe.position.y + pipe.boxCollider.offsetY;

    didBirdHitPipe = circleRectangleIntersects(
      bird.position.x + bird.circleCollider.offsetX,
      bird.position.y + bird.circleCollider.offsetY,
      bird.circleCollider.radius,
      pipe.position.x + pipe.boxCollider.offsetX,
      pipeRectangleColliderY,
      pipe.boxCollider.width,
      pipe.boxCollider.height,
    );

    if (didBirdHitPipe) {
      break;
    }
  }

  if (didBirdHitGround || didBirdHitPipe) {
    bird.die();
    ground.stop();
    pipeManager.stop();
    game.state = GameState.GameOver;
  } else {
    for (const [pipeIndex, pipe] of pipeManager.pipes.entries()) {
      if (pipe.cleared) {
        continue;
      }

      const nextPipe = pipeManager.pipes[pipeIndex + 1];

      if (pipe.centerX < bird.position.x) {
        pipe.cleared = true;
        nextPipe.cleared = true;
        scoreManager.score++;
      }
    }
  }

  // Draw the background
  context.drawImage(
    spriteSheet,
    spriteMap.background.sourceX,
    spriteMap.background.sourceY,
    spriteMap.background.width,
    spriteMap.background.height,
    0,
    0,
    spriteMap.background.width,
    spriteMap.background.height,
  );

  bird.draw(context);
  pipeManager.draw(context);
  ground.draw(context);

  if (game.state !== GameState.Title) {
    scoreManager.draw(context);
  }

  if (game.state === GameState.Title) {
    context.drawImage(
      spriteSheet,
      spriteMap.getReady.sourceX,
      spriteMap.getReady.sourceY,
      spriteMap.getReady.width,
      spriteMap.getReady.height,
      (config.gameWidth - spriteMap.getReady.width) / 2,
      (config.gameHeight - spriteMap.getReady.height) / 2,
      spriteMap.getReady.width,
      spriteMap.getReady.height,
    );
  }

  last = hrt;

  requestAnimationFrame(frame);
};

// Start the game loop.
requestAnimationFrame(frame);
