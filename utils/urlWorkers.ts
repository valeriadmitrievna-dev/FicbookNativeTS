import { useNavigation } from "@react-navigation/native";
import { Alert, Linking } from "react-native";
import { colors } from "./colors";

export const readficReg = /(https:\/\/)?ficbook.net\/readfic\/[0-9]+/g;
export const readficPartReg = /(https:\/\/)?ficbook.net\/readfic\/[0-9]+\/[0-9]+/g;
export const authorReg = /(https:\/\/)?ficbook.net\/authors\/[0-9]+/g;
export const DEFAULT_URL =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g;

export const getFicbookPath = (url: string) =>
  url.replace("https://ficbook.net/", "").replace("ficbook.net/", "");
