import { config } from "#/config";

export enum GameState {
  GameOver,
  Playing,
  Title,
}

export class Game {
  config = config;
  debug = false;
  state = GameState.Title;

  reset() {
    this.state = GameState.Title;
  }
}
