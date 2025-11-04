
export enum GameState {
  Start,
  LevelSelect,
  Game,
  End,
}

export interface Level {
  id: number;
  name: string;
  tables: number[];
  rank: string;
  color: string;
}

export interface Question {
  text: string;
  options: number[];
  answer: number;
}
