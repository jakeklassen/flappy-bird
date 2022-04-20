import { SpriteAnimationDetails } from "#/components/sprite-animation-details";
import { SpriteData } from "#/components/sprite-data";

export class SpriteAnimation {
  /**
   * The elapsed time of the current frame
   */
  public elapsedFrameTime = 0;

  /**
   * The frame rate of the animation in seconds.
   */
  public frameRate = 0;

  /**
   * Sprite data for each frame of the animation
   */
  public frames: SpriteData[] = [];

  public currentFrameIndex = 0;

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
        new SpriteData(
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
