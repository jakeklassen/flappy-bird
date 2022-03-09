import { Frame } from "#/components/frame";
import { SpriteAnimation } from "#/components/sprite-animation";
import { Vector2d } from "#/components/vector2d";

type BirdOptions = {
  spritesheet: HTMLImageElement;
  frame: Frame;
  position: Vector2d;
  flapAnimation: SpriteAnimation;
};

export class Bird {
  spritesheet: HTMLImageElement;
  frame: Frame;
  position: Vector2d;
  flapAnimation: SpriteAnimation;

  constructor(options: BirdOptions) {
    this.spritesheet = options.spritesheet;
    this.frame = options.frame;
    this.position = options.position;
    this.flapAnimation = options.flapAnimation;
  }

  public update(delta: number) {
    this.flapAnimation.update(delta);
  }

  public draw(context: CanvasRenderingContext2D) {
    const currentFrame = this.flapAnimation.getCurrentFrame();

    context.drawImage(
      this.spritesheet,
      currentFrame.sourceX,
      currentFrame.sourceY,
      currentFrame.width,
      currentFrame.height,
      this.position.x,
      this.position.y,
      currentFrame.width,
      currentFrame.height,
    );
  }
}
