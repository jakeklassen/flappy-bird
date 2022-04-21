import { CircleCollider } from "#/components/circle-collider";
import { SpriteAnimation } from "#/components/sprite-animation";
import { SpriteData } from "#/components/sprite-data";
import { Vector2d } from "#/components/vector2d";
import { Config } from "#/config";

type BirdOptions = {
  config: Config;
  spriteSheet: HTMLImageElement;
  spriteData: SpriteData;
  position: Vector2d;
  flapAnimation: SpriteAnimation;
  circlCollider: CircleCollider;
};

export enum BirdState {
  Idle,
  Flying,
  Dead,
}

export class Bird {
  state = BirdState.Idle;
  spriteSheet: HTMLImageElement;
  spriteData: SpriteData;
  position: Vector2d;
  flapAnimation: SpriteAnimation;
  velocity = new Vector2d();
  circleCollider: CircleCollider;
  config: Config;

  /**
   * Rotation in degrees
   */
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
   * Calculated using the formula: `gravity = (2 * jumpHeight) / timeToJumpApex ** 2`
   */
  gravity = (2 * this.jumpHeight) / this.timeToJumpApex ** 2;

  /**
   * Calculated using the formula: `thrust = gravity * timeToJumpApex`
   */
  thrust = this.gravity * this.timeToJumpApex;

  constructor(options: BirdOptions) {
    this.spriteSheet = options.spriteSheet;
    this.spriteData = options.spriteData;
    this.position = options.position;
    this.flapAnimation = options.flapAnimation;
    this.circleCollider = options.circlCollider;
    this.config = options.config;
  }

  public flap() {
    switch (this.state) {
      case BirdState.Idle: {
        this.state = BirdState.Flying;
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
      this.rotation = Math.max(-25, -25 * (this.velocity.y / -this.thrust));
    } else if (this.velocity.y > 0) {
      this.rotation = Math.min(50, 50 * (this.velocity.y / this.thrust));
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
      this.spriteSheet,
      currentFrame.sourceX,
      currentFrame.sourceY,
      currentFrame.width,
      currentFrame.height,
      -currentFrame.width / 2,
      -currentFrame.height / 2,
      currentFrame.width,
      currentFrame.height,
    );

    if (this.config.debug) {
      context.fillStyle = "red";
      context.globalAlpha = 0.5;
      context.beginPath();
      context.arc(0, 0, this.circleCollider.radius, 0, 2 * Math.PI);
      context.fill();
      context.globalAlpha = 1;
    }

    context.resetTransform();
  }
}
