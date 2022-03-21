export interface IPromo {
  cover?: string;
  direction: string;
  title: string;
  id: string;
  fandom: string;
}

export interface IRequest {
  likes: number;
  works: number;
  bookmarks: number;
  title: string;
  fandoms: IFandom[];
  content: string;
  tags: ITag[];
  id: string;
  directions: string[];
  ratings: number[];
  hot: boolean;
}

export interface IFandom {
  title: string;
  group: string;
  slug: string;
}

export interface ITag {
  title: string;
  description: string;
  id: string;
  adult: boolean;
}

export interface IFanfic {
  id: string;
  title: string;
  authors: IAuthorShort[];
  fandoms: IFandom[];
  pairings?: IPairing[];
  size: string;
  date: {
    text: string;
    title: string;
  };
  tags: ITag[];
  description: string;
  hot: boolean;
  direction: IBadge;
  rating: IBadge;
  status: IBadge;
  likes: IBadge;
  rewards: IBadge;
  translated: boolean;
}

export interface IBadge {
  value: string | number;
  title?: string;
}

export interface IPairing {
  title: string;
  id: string;
}

export interface IRatingNumber {
  number: number;
  count: number;
}

export interface IAuthorShort {
  name: string;
  id: string;
}
