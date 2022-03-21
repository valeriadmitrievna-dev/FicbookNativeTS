export interface SexType {
  femslash: string;
  het: string;
  gen: string;
  slash: string;
  mixed: string;
  other: string;
  article: string;
}

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
  femslash: "venus-double",
  het: "venus-mars",
  gen: "feather",
  slash: "mars-double",
  mixed: "random",
  other: "circle-notch",
  article: "circle-notch",
} as SexType;

export const directions = [
  "all",
  "gen",
  "het",
  "slash",
  "femslash",
  "mixed",
  "other",
];
