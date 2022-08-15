import { SpriteData } from "#/components/sprite-data";
import { Vector2d } from "#/components/vector2d";
import { Config } from "#/config";
import { SpriteMap } from "#/sprite-map";

type ScoreManagerOptions = {
  config: Config;
  spriteSheet: HTMLImageElement;
  spriteMap: SpriteMap;
};

export class ScoreManager {
  spriteMap: SpriteMap;
  spriteSheet: HTMLImageElement;
  public score = 0;
  private previousScore = 0;
  private characterPadding = 1;
  private scorePosition: Vector2d;

  private textCanvas = document.createElement("canvas");
  private textContext: CanvasRenderingContext2D;

  constructor(options: ScoreManagerOptions) {
    this.spriteMap = options.spriteMap;
    this.spriteSheet = options.spriteSheet;
    this.scorePosition = new Vector2d(options.config.gameWidth / 2, 24);

    // All number sprites are the same height so we only need to set this once.
    this.textCanvas.height = this.spriteMap.text.zero.height;

    const textContext = this.textCanvas.getContext("2d");
    if (textContext == null) {
      throw new Error("Failed to create text context");
    }

    this.textContext = textContext;

    this.convertNumberToImage(this.score);
  }

  public reset() {
    // Just reset `score`, update will take care of checking the previous score
    // and redrawing the score at 0.
    this.score = 0;
  }

  public draw(context: CanvasRenderingContext2D) {
    if (this.previousScore !== this.score) {
      this.convertNumberToImage(this.score);

      this.previousScore = this.score;
    }

    context.drawImage(
      this.textCanvas,
      Math.floor(this.scorePosition.x - this.textCanvas.width / 2),
      this.scorePosition.y,
    );
  }

  convertNumberToImage(score: number): void {
    const numberString = score.toString();

    const characters: Array<{
      character: string;
      frame: SpriteData;
      width: number;
    }> = [];

    for (const character of numberString) {
      switch (character) {
        case "1":
          characters.push({
            character,
            frame: this.spriteMap.text.one,
            width: this.spriteMap.text.one.width,
          });
          break;
        case "2":
          characters.push({
            character,
            frame: this.spriteMap.text.two,
            width: this.spriteMap.text.two.width,
          });
          break;
        case "3":
          characters.push({
            character,
            frame: this.spriteMap.text.three,
            width: this.spriteMap.text.three.width,
          });
          break;
        case "4":
          characters.push({
            character,
            frame: this.spriteMap.text.four,
            width: this.spriteMap.text.four.width,
          });
          break;
        case "5":
          characters.push({
            character,
            frame: this.spriteMap.text.five,
            width: this.spriteMap.text.five.width,
          });
          break;
        case "6":
          characters.push({
            character,
            frame: this.spriteMap.text.six,
            width: this.spriteMap.text.six.width,
          });
          break;
        case "7":
          characters.push({
            character,
            frame: this.spriteMap.text.seven,
            width: this.spriteMap.text.seven.width,
          });
          break;
        case "8":
          characters.push({
            character,
            frame: this.spriteMap.text.eight,
            width: this.spriteMap.text.eight.width,
          });
          break;
        case "9":
          characters.push({
            character,
            frame: this.spriteMap.text.nine,
            width: this.spriteMap.text.nine.width,
          });
          break;
        case "0":
          characters.push({
            character,
            frame: this.spriteMap.text.zero,
            width: this.spriteMap.text.zero.width,
          });
          break;
      }
    }

    const canvasWidth = characters.reduce(
      (acc, { width }) => acc + width + this.characterPadding,
      -this.characterPadding,
    );

    this.textCanvas.width = canvasWidth;
    this.textContext.clearRect(
      0,
      0,
      this.textCanvas.width,
      this.textCanvas.height,
    );

    let x = 0;
    for (const character of characters) {
      this.textContext.drawImage(
        this.spriteSheet,
        character.frame.sourceX,
        character.frame.sourceY,
        character.frame.width,
        character.frame.height,
        x,
        0,
        character.frame.width,
        character.frame.height,
      );

      x += character.width + this.characterPadding;
    }
  }
}
