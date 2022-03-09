import { Frame } from "#/components/frame";
import { Vector2d } from "#/components/vector2d";

type GroundOptions = {
  position: Vector2d;
  frame: Frame;
  spritesheet: HTMLImageElement;

  /**
   * This is in pixels **per frame**.
   */
  scrollSpeed: number;
};

export class Ground {
  position: Vector2d;
  frame: Frame;
  spritesheet: HTMLImageElement;
  scrollSpeed: number;

  // Track the current scroll position separately from the position.
  public scrollPositionX = 0;

  constructor(options: GroundOptions) {
    this.position = options.position;
    this.frame = options.frame;
    this.spritesheet = options.spritesheet;
    this.scrollSpeed = options.scrollSpeed;
  }

  public update(delta: number) {
    this.scrollPositionX -= this.scrollSpeed * delta;

    // Once the whole image is offscreen, reset the x position to 0 to
    // create the loop effect.
    if (this.scrollPositionX <= -this.frame.width) {
      this.scrollPositionX = 0;
    }
  }

  public draw(context: CanvasRenderingContext2D) {
    // First track how far the image is offscreen.
    const diff = Math.abs(this.scrollPositionX);

    // Draw the visible portion of the image.
    context.drawImage(
      this.spritesheet,
      this.frame.sourceX + diff,
      this.frame.sourceY,
      this.frame.width - diff,
      this.frame.height,
      this.position.x,
      this.position.y,
      this.frame.width - diff,
      this.frame.height,
    );

    // Draw the remaining portion of the image (what is currently offscreen).
    context.drawImage(
      this.spritesheet,
      this.frame.sourceX,
      this.frame.sourceY,
      diff,
      this.frame.height,
      context.canvas.width - diff,
      this.position.y,
      diff,
      this.frame.height,
    );
  }
}
