import { Frame } from "#/components/frame";
import { SpriteAnimation } from "#/components/sprite-animation";
import { Vector2d } from "#/components/vector2d";

export enum BirdState {
  Idle,
  Flying,
  Dead,
}

type BirdOptions = {
  spritesheet: HTMLImageElement;
  frame: Frame;
  position: Vector2d;
  flapAnimation: SpriteAnimation;
};

export class Bird {
  state = BirdState.Idle;
  spritesheet: HTMLImageElement;
  frame: Frame;
  position: Vector2d;
  flapAnimation: SpriteAnimation;
  velocity = new Vector2d();
  rotation = 0;

  /**
   * Height in pixels
   */
  jumpHeight = 48;

  /**
   * Time in seconds
   */
  timeToJumpApex = 0.35;

  /**
   * Calculated using the formula: `gravity = 2 * jumpHeight / timeToJumpApex ** 2`
   */
  gravity = (2 * this.jumpHeight) / this.timeToJumpApex ** 2;

  /**
   * Calculated using the formula: `thrust = gravity * timeToJumpApex`
   */
  thrust = this.gravity * this.timeToJumpApex;

  constructor(options: BirdOptions) {
    this.spritesheet = options.spritesheet;
    this.frame = options.frame;
    this.position = options.position;
    this.flapAnimation = options.flapAnimation;
  }

  public flap() {
    switch (this.state) {
      case BirdState.Idle: {
        this.state = BirdState.Flying;
        // Apply thrust on the transition as well, it felt good
        this.velocity.y = -this.thrust;

        break;
      }

      case BirdState.Flying: {
        this.velocity.y = -this.thrust;

        break;
      }
    }
  }

  public setRotation() {
    if (this.velocity.y < 0) {
      this.rotation = Math.max(
        -25,
        (-25 * this.velocity.y) / (-1 * this.thrust),
      );
    } else if (this.velocity.y > 0) {
      this.rotation = Math.min(50, (50 * this.velocity.y) / this.thrust);
    }
  }

  public update(delta: number) {
    switch (this.state) {
      case BirdState.Idle: {
        this.flapAnimation.update(delta);

        break;
      }

      case BirdState.Flying: {
        this.flapAnimation.update(delta);
        this.velocity.y += this.gravity * delta;
        this.position.y += this.velocity.y * delta;
        this.setRotation();

        break;
      }
    }
  }

  public draw(context: CanvasRenderingContext2D) {
    context.translate(this.position.x, this.position.y);
    const rotation = (this.rotation * Math.PI) / 180;
    context.rotate(rotation);

    const currentFrame = this.flapAnimation.getCurrentFrame();

    context.drawImage(
      this.spritesheet,
      currentFrame.sourceX,
      currentFrame.sourceY,
      currentFrame.width,
      currentFrame.height,
      -currentFrame.width / 2,
      -currentFrame.height / 2,
      currentFrame.width,
      currentFrame.height,
    );

    context.resetTransform();
  }
}