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
import { loadImage } from "#/lib/asset-loader";
import { spriteMap } from "#/sprite-map";

const spriteSheet = await loadImage(spriteSheetUrl);

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
  bird.flap();
});

window.addEventListener("keypress", (event) => {
  if (event.code === "KeyD") {
    config.debug = !config.debug;
  }
});

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

const ground = new Ground({
  boxCollider: new BoxCollider(
    0,
    0,
    spriteMap.ground.width,
    spriteMap.ground.height,
  ),
  config,
  position: new Vector2d(0, config.gameHeight - spriteMap.ground.height),
  spriteData: spriteMap.ground,
  spriteSheet: spriteSheet,
  scrollSpeed: 120,
});

const bird = new Bird({
  config,
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

let last = performance.now();

/**
 * The game loop.
 */
const frame = (hrt: DOMHighResTimeStamp) => {
  const dt = Math.min(1000, hrt - last) / 1000;

  context.clearRect(0, 0, canvas.width, canvas.height);

  ground.update(dt);
  bird.update(dt);

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

  ground.draw(context);
  bird.draw(context);

  last = hrt;

  requestAnimationFrame(frame);
};

// Start the game loop.
requestAnimationFrame(frame);
