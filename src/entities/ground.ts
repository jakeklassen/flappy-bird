import { BoxCollider } from "#/components/box-collider";
import { SpriteData } from "#/components/sprite-data";
import { Vector2d } from "#/components/vector2d";
import { Config } from "#/config";

type GroundOptions = {
  boxCollider: BoxCollider;
  config: Config;
  position: Vector2d;
  spriteData: SpriteData;
  spriteSheet: HTMLImageElement;

  /**
   * This is in pixels **per frame**.
   */
  scrollSpeed: number;
};

export class Ground {
  boxCollider: BoxCollider;
  config: Config;
  position: Vector2d;
  spriteData: SpriteData;
  spriteSheet: HTMLImageElement;
  scrollSpeed: number;

  // Track the current scroll position separately from the position.
  public scrollPositionX = 0;

  constructor(options: GroundOptions) {
    this.boxCollider = options.boxCollider;
    this.config = options.config;
    this.position = options.position;
    this.spriteData = options.spriteData;
    this.spriteSheet = options.spriteSheet;
    this.scrollSpeed = options.scrollSpeed;
  }

  public update(delta: number) {
    this.scrollPositionX -= this.scrollSpeed * delta;

    // Once the whole image is offscreen, reset the x position to 0 to
    // create the loop effect.
    if (this.scrollPositionX <= -this.spriteData.width) {
      this.scrollPositionX = -(
        Math.abs(this.spriteData.width) - Math.abs(this.scrollPositionX)
      );
    }
  }

  public draw(context: CanvasRenderingContext2D) {
    // First track how far the image is offscreen.
    const diff = Math.abs(this.scrollPositionX);

    // Draw the visible portion of the image.
    context.drawImage(
      this.spriteSheet,
      this.spriteData.sourceX + diff,
      this.spriteData.sourceY,
      this.spriteData.width - diff,
      this.spriteData.height,
      this.position.x,
      this.position.y,
      this.spriteData.width - diff,
      this.spriteData.height,
    );

    // Draw the remaining portion of the image (what is currently offscreen).
    context.drawImage(
      this.spriteSheet,
      this.spriteData.sourceX,
      this.spriteData.sourceY,
      diff,
      this.spriteData.height,
      context.canvas.width - diff,
      this.position.y,
      diff,
      this.spriteData.height,
    );

    if (this.config.debug) {
      context.fillStyle = "red";
      context.globalAlpha = 0.5;
      context.fillRect(
        this.position.x,
        this.position.y,
        this.boxCollider.width,
        this.boxCollider.height,
      );

      context.globalAlpha = 1;
    }
  }
}
