/**
 * Represents a rectangular frame from a source image.
 */
export class Frame {
  constructor(
    /**
     * The x position of the frame in the source image.
     */
    public sourceX: number,

    /**
     * The y position of the frame in the source image.
     */
    public sourceY: number,

    public width: number,
    public height: number,
  ) {}
}
