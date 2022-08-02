import { BoxCollider } from "#/components/box-collider";
import { SpriteData } from "#/components/sprite-data";
import { Vector2d } from "#/components/vector2d";
import { Game } from "#/game";

type PipeOptions = {
  game: Game;
  position: Vector2d;
  rimSpriteData: SpriteData;
  sliceSpriteData: SpriteData;
  spriteSheet: HTMLImageElement;
  type: "top" | "bottom";
};

export class Pipe {
  height: number;
  boxCollider: BoxCollider;
  game: Game;
  position: Vector2d;
  rimSpriteData: SpriteData;
  sliceSpriteData: SpriteData;
  spriteSheet: HTMLImageElement;
  type: "top" | "bottom";

  constructor(options: PipeOptions) {
    this.game = options.game;
    this.position = options.position;
    this.rimSpriteData = options.rimSpriteData;
    this.sliceSpriteData = options.sliceSpriteData;
    this.spriteSheet = options.spriteSheet;
    this.type = options.type;

    this.height =
      this.type === "top"
        ? this.position.y
        : this.game.config.gameHeight - this.position.y;

    // this.boxCollider = new BoxCollider(4, 0, 56, this.height);
    this.boxCollider = new BoxCollider(
      0 + this.game.config.pipe.collider.offsetX,
      0,
      this.game.config.pipe.collider.width,
      this.height,
    );
  }

  public draw(context: CanvasRenderingContext2D) {
    context.drawImage(
      this.spriteSheet,
      this.rimSpriteData.sourceX,
      this.rimSpriteData.sourceY,
      this.rimSpriteData.width,
      this.rimSpriteData.height,
      this.position.x,
      this.type === "top"
        ? this.height - this.rimSpriteData.height
        : this.position.y,
      this.rimSpriteData.width,
      this.rimSpriteData.height,
    );

    if (this.type === "top") {
      context.drawImage(
        this.spriteSheet,
        this.sliceSpriteData.sourceX,
        this.sliceSpriteData.sourceY,
        this.sliceSpriteData.width,
        this.sliceSpriteData.height,
        this.position.x,
        0,
        this.sliceSpriteData.width,
        this.height - this.rimSpriteData.height,
      );
    } else {
      context.drawImage(
        this.spriteSheet,
        this.sliceSpriteData.sourceX,
        this.sliceSpriteData.sourceY,
        this.sliceSpriteData.width,
        this.sliceSpriteData.height,
        this.position.x,
        this.position.y + this.rimSpriteData.height,
        this.sliceSpriteData.width,
        this.height - this.rimSpriteData.height,
      );
    }

    if (this.game.debug) {
      context.fillStyle = "red";
      context.globalAlpha = 0.5;

      context.fillRect(
        this.position.x + this.boxCollider.offsetX,
        this.type === "top" ? 0 : this.position.y + this.boxCollider.offsetY,
        this.boxCollider.width,
        this.boxCollider.height,
      );

      context.globalAlpha = 1;
    }
  }
}
