import "@react-navigation/native";

interface PromoTheme {
  background: string;
  icon: string;
}

declare module "@react-navigation/native" {
  export type ExtendedTheme = {
    dark: boolean;
    colors: {
      background: string;
      primary: string;
      card: string;
      border: string;
      text: string;
      hot: string;
      text: string;
      promo: PromoTheme;
    } & Theme;
  };
  export function useTheme(): ExtendedTheme;
}
