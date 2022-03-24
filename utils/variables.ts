export interface Direction {
  femslash: string;
  het: string;
  gen: string;
  slash: string;
  mixed: string;
  other: string;
  article: string;
  all?: string;
}

export type DirectionList =
  | "het"
  | "gen"
  | "femslash"
  | "slash"
  | "mixed"
  | "other"
  | "article"
  | "all";

export type RatingList = "G" | "PG-13" | "R" | "NC-17" | "NC-21";
export type StatusList = "finished" | "in-progress" | "frozen";

export interface RatingType {
  G: string;
  "PG-13": string;
  R: string;
  "NC-17": string;
  "NC-21": string;
}

export interface StatusType {
  finished: string;
  "in-progress": string;
  frozen: string;
}

export const sex = {
  femslash: "gender-female",
  het: "venus-mars",
  gen: "feather",
  slash: "mars-double",
  mixed: "random",
  other: "circle-notch",
  article: "circle-notch",
} as Direction;

export const directions = [
  "all",
  "gen",
  "het",
  "slash",
  "femslash",
  "mixed",
  "other",
  "article",
] as DirectionList[];
