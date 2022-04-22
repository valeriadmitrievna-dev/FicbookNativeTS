import { Pressable, StyleSheet } from "react-native";
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
}

export default function BackButton({ round, size = 36 }: BackButtonProps) {
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
    <Pressable onPress={goBack}>
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
