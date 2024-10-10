import { DictionaryTypes, Directions, Heights, Variations, Stands, MoveTypes } from "./enums";

type Dictionary = {
  name: string;
  description: string;
  type: DictionaryTypes;
}

type Indicende = 1 | 2 | 3 | 4 | 5;

type Kyu = number;

type Height = {
  name: Heights;
  incidence: Indicende;
}

type Direction = {
  name: Directions;
  incidence: Indicende;
}

type Variation = {
  name: Variations;
  incidence: Indicende;
}

type Move = {
  name: string;
  name_variation?: string;
  type: MoveTypes;
  kyu: Kyu;
  incidence: Indicende;
  heights?: Array<Height>;
  variations?: Array<Variation>;
  directions?: Array<Direction>;
  stands: Array<Stands>;
}

export type { Dictionary, Height, Direction, Variation, Move, Kyu }
