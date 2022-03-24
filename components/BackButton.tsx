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
}

export default function BackButton({ round }: BackButtonProps) {
  const theme = useTheme();
  const navigation = useNavigation<any>();

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("main");
    }
  };

  return (
    <Pressable onPress={goBack}>
      {round ? (
        <Icon
          size={36}
          color={theme.colors.text}
          name="arrow-back-circle-outline"
        />
      ) : (
        <Icon size={36} color={theme.colors.text} name="arrow-back" />
      )}
    </Pressable>
  );
}

const createStyles = (theme: ExtendedTheme) => StyleSheet.create({});
