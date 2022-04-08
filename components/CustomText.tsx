import React from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { StyleProp, TextStyle, Linking, Alert, Text } from "react-native";
import Autolink from "react-native-autolink";
import { colors } from "../utils/colors";
import {
  getFicbookPath,
  readficReg,
  readficPartReg,
  authorReg,
  DEFAULT_URL,
} from "../utils/urlWorkers";
import { TextProps } from "../interfaces";

const CustomText = ({
  size = 15,
  line = size * 1.5,
  color,
  children = "",
  weight = "400Regular",
  ml = 0,
  mr = 0,
  mb = 0,
  mt = 0,
  center = false,
  capitalize = false,
  underlined = false,
  onPress,
  italic = false,
  width = "auto",
  numberOfLines = 0,
  style,
}: TextProps) => {
  const theme = useTheme();
  const styles = {
    fontFamily: `Montserrat_${weight}${italic ? "_Italic" : ""}`,
    color: color || theme.colors.text,
    fontSize: size,
    marginBottom: mb,
    marginTop: mt,
    marginLeft: ml,
    marginRight: mr,
    textAlign: center ? "center" : "left",
    textTransform: capitalize ? "capitalize" : "none",
    lineHeight: line,
    textDecorationLine: underlined ? "underline" : "none",
    width,
    maxWidth: "100%",
    ...style,
  } as StyleProp<TextStyle>;

  const navigation = useNavigation<any>();

  const getFanficID = (match: any) => {
    const url = getFicbookPath(match.getReplacerArgs()[0]);
    const id = url.replace("readfic/", "");
    navigation.push("fanfic", { id });
  };
  const getFanficWithPart = (match: any) => {
    const url = getFicbookPath(match.getReplacerArgs()[0]);
    const id = url.replace("readfic/", "").split("/")[0];
    const part = url.replace("readfic/", "").split("/")[1];
    navigation.push("fanfic", { id, part });
  };
  const getAuthorID = (match: any) => {
    console.log(
      "author id:",
      getFicbookPath(match.getReplacerArgs()[0]).replace("authors/", "")
    );
  };

  return !!onPress ? (
    <Text onPress={onPress} style={styles} numberOfLines={numberOfLines}>
      {children}
    </Text>
  ) : (
    <Autolink
      text={children.toString()}
      style={styles}
      numberOfLines={numberOfLines}
      url={false}
      matchers={[
        {
          pattern: readficPartReg,
          style: { color: colors.orangeAccentHEX },
          getLinkText: () => "(ссылка на главу)",
          onPress: getFanficWithPart,
        },
        {
          pattern: readficReg,
          style: { color: colors.orangeAccentHEX },
          getLinkText: () => "ссылка на фанфик",
          onPress: getFanficID,
        },
        {
          pattern: authorReg,
          style: { color: colors.orangeAccentHEX },
          getLinkText: () => "(ссылка на автора)",
          onPress: getAuthorID,
        },
        {
          pattern: DEFAULT_URL,
          style: { color: colors.orangeAccentHEX },
          getLinkText: (replacement: any) => replacement[0],
          onPress: async (match: any) => {
            const url = match.getReplacerArgs()[0];
            const supported = await Linking.canOpenURL(url);
            if (supported) {
              await Linking.openURL(url);
            } else {
              Alert.alert(`Don't know how to open this URL: ${url}`);
            }
          },
        },
      ]}
      linkStyle={{ color: colors.orangeAccentHEX }}
    />
  );
};

export default CustomText;
