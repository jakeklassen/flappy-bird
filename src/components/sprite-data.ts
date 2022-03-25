/**
 * Represents rectangular sprite data from a source image.
 */
export class SpriteData {
  constructor(
    /**
     * The x position of the sprite in the source image.
     */
    public sourceX: number,

    /**
     * The y position of the sprite in the source image.
     */
    public sourceY: number,

    public width: number,
    public height: number,
  ) {}
}
