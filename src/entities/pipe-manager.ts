import { SpriteData } from "#/components/sprite-data";
import { Vector2d } from "#/components/vector2d";
import { Pipe } from "#/entities/pipe";
import { Game } from "#/game";
import { randomBetween } from "#/lib/random";
import { SpriteMap } from "#/sprite-map";

type PipeManagerOptions = {
  game: Game;
  spriteMap: SpriteMap;
  spriteSheet: HTMLImageElement;
};

export class PipeManager {
  currentSpawnPosition: Vector2d;
  game: Game;
  pipes: Pipe[] = [];
  pipeScrollSpeed: number;
  spawnTimerThreshold: number;
  spawnTimerAccumulator = 0;
  spawnPositionYMinimum: number;
  spawnPositionYMaximum: number;
  spriteMap: SpriteMap;
  spriteSheet: HTMLImageElement;
  stopped = true;

  constructor(options: PipeManagerOptions) {
    this.game = options.game;
    this.pipeScrollSpeed = this.game.config.pipeManager.pipeScrollSpeed;
    this.spriteMap = options.spriteMap;
    this.spriteSheet = options.spriteSheet;
    this.spawnTimerThreshold =
      this.game.config.pipeManager.spawnIntervalInSeconds;

    // Account for ground height to make the distribution of pipes more even
    const halfGameHeight =
      (this.game.config.gameHeight - this.spriteMap.ground.height) / 2;

    // Double the buffer for a wider distribution
    const doubleBuffer = this.game.config.pipeManager.pipeSpawnBuffer * 2;

    this.spawnPositionYMinimum = halfGameHeight - doubleBuffer;
    this.spawnPositionYMaximum = halfGameHeight + doubleBuffer;

    this.currentSpawnPosition = new Vector2d(
      this.game.config.gameWidth,
      halfGameHeight,
    );
  }

  public reset() {
    this.pipes = [];
    this.spawnTimerAccumulator = 0;
    this.stopped = true;
  }

  public stop() {
    this.stopped = true;
  }

  public start() {
    this.stopped = false;
  }

  public update(delta: number) {
    if (this.stopped) {
      return;
    }

    this.spawnTimerAccumulator += delta;

    if (this.spawnTimerAccumulator >= this.spawnTimerThreshold) {
      this.spawnTimerAccumulator = 0;

      this.currentSpawnPosition.y = Math.floor(
        randomBetween(this.spawnPositionYMinimum, this.spawnPositionYMaximum),
      );

      this.pipes.push(
        new Pipe({
          game: this.game,
          spriteSheet: this.spriteSheet,
          position: new Vector2d(
            this.currentSpawnPosition.x,
            this.currentSpawnPosition.y -
              this.game.config.pipeManager.pipeSpawnBuffer,
          ),
          rimSpriteData: new SpriteData(
            this.spriteMap.pipes.green.bottom.sourceX,
            this.spriteMap.pipes.green.bottom.sourceY,
            this.spriteMap.pipes.green.bottom.width,
            this.spriteMap.pipes.green.bottom.height,
          ),
          sliceSpriteData: new SpriteData(
            this.spriteMap.pipes.green.slice.sourceX,
            this.spriteMap.pipes.green.slice.sourceY,
            this.spriteMap.pipes.green.slice.width,
            this.spriteMap.pipes.green.slice.height,
          ),
          type: "top",
        }),

        new Pipe({
          game: this.game,
          spriteSheet: this.spriteSheet,
          position: new Vector2d(
            this.currentSpawnPosition.x,
            this.currentSpawnPosition.y +
              this.game.config.pipeManager.pipeSpawnBuffer,
          ),
          rimSpriteData: new SpriteData(
            this.spriteMap.pipes.green.top.sourceX,
            this.spriteMap.pipes.green.top.sourceY,
            this.spriteMap.pipes.green.top.width,
            this.spriteMap.pipes.green.top.height,
          ),
          sliceSpriteData: new SpriteData(
            this.spriteMap.pipes.green.slice.sourceX,
            this.spriteMap.pipes.green.slice.sourceY,
            this.spriteMap.pipes.green.slice.width,
            this.spriteMap.pipes.green.slice.height,
          ),
          type: "bottom",
        }),
      );
    }

    let pipesToRemove = 0;

    for (const pipe of this.pipes) {
      pipe.position.x -= this.pipeScrollSpeed * delta;

      if (pipe.position.x < -pipe.sliceSpriteData.width) {
        ++pipesToRemove;
      }
    }

    while (pipesToRemove > 0) {
      this.pipes.shift();

      --pipesToRemove;
    }
  }

  public draw(context: CanvasRenderingContext2D) {
    for (const pipe of this.pipes) {
      pipe.draw(context);
    }

    if (this.game.debug) {
      context.fillStyle = "purple";
      context.fillRect(
        0,
        this.spawnPositionYMinimum,
        this.game.config.gameWidth,
        1,
      );
      context.fillRect(
        0,
        this.spawnPositionYMaximum,
        this.game.config.gameWidth,
        1,
      );

      context.fillStyle = "red";
      context.fillRect(
        0,
        this.currentSpawnPosition.y,
        this.game.config.gameWidth,
        1,
      );
    }
  }
}
