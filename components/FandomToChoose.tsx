import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { useMemo } from "react";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import { IFandom } from "../interfaces";
import CustomText from "./CustomText";
import { hexToRgb } from "../utils/functions";

interface FandomToChooseProps {
  navigation?: any;
  fandom: IFandom;
  style?: ViewStyle;
  onPress?: Function;
}

export default function FandomToChoose({
  fandom,
  navigation,
  style,
  onPress,
}: FandomToChooseProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) onPress();
        else navigation.push("fandom", { fandom });
      }}
      style={[styles.fandom, style]}
      key={fandom.id}
    >
      <CustomText weight="700Bold">{fandom.title.trim()}</CustomText>
      <CustomText>{fandom.subtitle}</CustomText>
    </TouchableOpacity>
  );
}

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    fandom: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderBottomWidth: 2,
      borderBottomColor: `rgba(${hexToRgb(theme.colors.text)}, 0.3)`,
      backgroundColor: theme.colors.primary,
    },
  });
