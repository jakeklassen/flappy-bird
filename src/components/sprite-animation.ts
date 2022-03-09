import { Frame } from "#/components/frame";
import { SpriteAnimationDetails } from "#/components/sprite-animation-details";

export class SpriteAnimation {
  public elapsedFrameTime = 0;
  public currentFrameIndex = 0;
  public frames: Frame[] = [];

  /**
   * The frame rate of the animation in seconds.
   */
  public frameRate = 0;

  constructor(
    public animationDetails: SpriteAnimationDetails,
    public durationInSeconds: number,
  ) {
    const horizontalFrames =
      animationDetails.width / animationDetails.frameWidth;

    for (let i = 0; i < horizontalFrames; i++) {
      const sourceX =
        animationDetails.sourceX + i * animationDetails.frameWidth;

      this.frames.push(
        new Frame(
          sourceX,
          animationDetails.sourceY,
          animationDetails.frameWidth,
          animationDetails.frameHeight,
        ),
      );
    }

    // Determine the frame rate based on the duration of the animation
    // and the number of frames.
    this.frameRate = this.durationInSeconds / this.frames.length;
  }

  public update(delta: number) {
    this.elapsedFrameTime += delta;

    if (this.elapsedFrameTime >= this.frameRate) {
      this.elapsedFrameTime = 0;

      this.currentFrameIndex =
        (this.currentFrameIndex + 1) % this.frames.length;
    }
  }

  public getCurrentFrame() {
    return this.frames[this.currentFrameIndex];
  }
}
