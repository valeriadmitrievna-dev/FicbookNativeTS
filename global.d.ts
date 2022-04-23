import { ColorValue } from "react-native";
import "@react-navigation/native";

declare module "@react-navigation/native" {
  export type ExtendedTheme = {
    dark: boolean;
    colors: {
      background: ColorValue;
      card: ColorValue;
      primary: ColorValue;
      secondary: ColorValue;
      tertiary: ColorValue;
      border: ColorValue;
      text: ColorValue;
      textInvert: ColorValue;
      hot: ColorValue;
      promo: ColorValue;
    } & Theme;
  };
  export function useTheme(): ExtendedTheme;
}
