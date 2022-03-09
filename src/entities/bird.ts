import { Frame } from "#/components/frame";
import { Vector2d } from "#/components/vector2d";

type BirdOptions = {
  spritesheet: HTMLImageElement;
  frame: Frame;
  position: Vector2d;
};

export class Bird {
  spritesheet: HTMLImageElement;
  frame: Frame;
  position: Vector2d;

  constructor(options: BirdOptions) {
    this.spritesheet = options.spritesheet;
    this.frame = options.frame;
    this.position = options.position;
  }

  public draw(context: CanvasRenderingContext2D) {
    context.drawImage(
      this.spritesheet,
      this.frame.sourceX,
      this.frame.sourceY,
      this.frame.width,
      this.frame.height,
      this.position.x,
      this.position.y,
      this.frame.width,
      this.frame.height,
    );
  }
}
