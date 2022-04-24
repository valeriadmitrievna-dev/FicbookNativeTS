import { Pressable, StyleSheet, ViewStyle } from "react-native";
import React from "react";
import {
  ExtendedTheme,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

interface BackButtonProps {
  round?: boolean;
  size?: number;
  style?: ViewStyle;
}

export default function BackButton({ round, size = 36, style }: BackButtonProps) {
  const theme = useTheme();
  const navigation = useNavigation<any>();

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.push("main");
    }
  };

  return (
    <Pressable onPress={goBack} style={style}>
      {round ? (
        <Icon
          size={size}
          color={theme.colors.text}
          name="arrow-back-circle-outline"
        />
      ) : (
        <Icon size={size} color={theme.colors.text} name="arrow-back" />
      )}
    </Pressable>
  );
}

const createStyles = (theme: ExtendedTheme) => StyleSheet.create({});
