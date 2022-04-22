import { ViewStyle } from "react-native";
import { DirectionList, RatingList, StatusList } from "./utils/variables";

export interface TextProps {
  size?: number;
  line?: number;
  color?: ColorValue;
  weight?: string;
  ml?: number;
  mr?: number;
  mb?: number;
  mt?: number;
  center?: boolean;
  capitalize?: boolean;
  underlined?: boolean;
  onPress?: (el: any) => void;
  italic?: boolean;
  width?: string | number;
  numberOfLines?: number;
  style?: TextStyle & ViewStyle;
  children: string | number;
}

export interface IPromo {
  cover?: string;
  direction: DirectionList;
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
  id?: string;
  subtitle?: string;
}

export interface ITag {
  title: string;
  description?: string;
  id: string;
  adult: boolean;
  spoiler?: boolean;
  synonyms?: string;
  count?: number;
}

export interface ITagInfo {
  id: string;
  title: string;
  description: string;
  synonyms: string;
}

export interface IFanfic {
  id: string;
  title: string;
  authors: IAuthor[];
  fandoms: IFandom[];
  pairings?: IPairing[];
  size: string;
  date?: {
    text: string;
    title: string;
  };
  tags: ITag[];
  description: string;
  hot: boolean;
  direction: {
    value: DirectionList;
    title: string;
  };
  rating: {
    value: RatingList;
    title: RatingList;
  };
  status: {
    value: StatusList;
    title: string;
  };
  likes: IBadge;
  rewards: IBadge;
  translated?: boolean;
  comment?: string;
  away?: string;
  for?: string;
  cover?: string;
  request?: {
    title: string;
    id: string;
  };
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

export interface IAuthor {
  name: string;
  id: string;
  info?: string;
  avatar?: string;
}

export interface IPart {
  id: string;
  title: string;
  info: string;
}

export interface IFicContent {
  navigation: {
    main: string;
    prev?: string;
    next?: string;
  };
  title: string;
  info: string;
  comment_top?: string;
  comment_bottom?: string;
  content: string;
}

export interface ScrollToObject {
  y: number;
  loaded: boolean;
}
