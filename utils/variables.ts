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
export const fandom_filters = [
  { key: "any", value: "Все" },
  { key: "originals", value: "Ориджиналы" },
  { key: "group", value: "Все фанфики в группе фэндомов" },
  { key: "fandom", value: "Фанфики по конкретным фэндомам" },
];
export const pages_filter = [
  { key: 1, value: "Любое" },
  { key: 2, value: "До 3" },
  { key: 3, value: "До 20" },
  { key: 4, value: "От 21 до 70" },
  { key: 5, value: "От 71" },
  { key: 6, value: "другой размер" },
];
export const status_filter = [
  { key: 1, value: "В процессе" },
  { key: 2, value: "Завершён" },
  { key: 3, value: "Заморожен" },
];
export const size_filter = [
  { key: 2, value: "Мини" },
  { key: 3, value: "Миди" },
  { key: 4, value: "Макси" },
];
export const translate_filter = [
  { key: 1, value: "Все равно" },
  { key: 2, value: "Перевод с иностранного языка" },
  { key: 3, value: "Оригинальный текст" },
];
export const sorting_filter = [
  { key: 1, value: "по оценкам читателей (лучшее наверху)" },
  { key: 2, value: "по количеству отзывов" },
  { key: 3, value: "по дате обновления (от новых к старым)" },
  { key: 9, value: "по дате обновления (от старых к новым)" },
  { key: 4, value: "по количеству страниц" },
  { key: 8, value: "по количеству наград" },
  { key: 5, value: "20 случайных работ" },
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
export const ratings_by_numbers = {
  5: "G",
  6: "PG-13",
  7: "R",
  8: "NC-17",
  9: "NC-21",
};
