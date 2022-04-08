export type DirectionList =
  | "het"
  | "gen"
  | "femslash"
  | "slash"
  | "mixed"
  | "other"
  | "article";

export type RatingList = "G" | "PG-13" | "R" | "NC-17" | "NC-21";
export type StatusList = "finished" | "in-progress" | "frozen";

export const sex = {
  femslash: "gender-female",
  het: "venus-mars",
  gen: "feather",
  slash: "mars-double",
  mixed: "random",
  other: "circle-notch",
  article: "circle-notch",
};

export const directions = [
  { key: "gen", value: "Джен" },
  { key: "het", value: "Гет" },
  { key: "slash", value: "Слэш" },
  { key: "femslash", value: "Фемслэш" },
  { key: "mixed", value: "Смешанная" },
  { key: "other", value: "Другие виды отношений" },
  { key: "article", value: "Статья" },
];

export const ratings = [
  { key: "G", value: "G" },
  { key: "PG-13", value: "PG-13" },
  { key: "R", value: "R" },
  { key: "NC-17", value: "NC-17" },
  { key: "NC-21", value: "NC-21" },
];

export const directions_by_numbers = {
  1: "gen",
  2: "het",
  3: "slash",
  4: "femslash",
  5: "article",
  6: "mixed",
  7: "other",
};
