import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useRoute, useTheme } from "@react-navigation/native";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs/src/types";
import { hexToRgb } from "../utils/functions";

const TabBarButton = ({
  accessibilityState,
  onPress,
}: BottomTabBarButtonProps) => {
  const theme = useTheme();
  const color = accessibilityState?.selected
    ? theme.colors.text
    : `rgba(${hexToRgb(theme.colors.text)}, 0.5)`;
  const route = useRoute();

  return (
    <Pressable onPress={onPress} style={styles.button}>
      {route.name === "home" && <Icon name="home" size={24} color={color} />}
      {/* {route === "popular" && <Icon name="star" size={24} color={color} />} */}
      {/* {route === "fanfic" && <Icon name="star" size={24} color={color} />} */}
      {/* {route === "fandom" && <Icon name="pen-tool" size={24} color={color} />} */}
      {/* {route === "profile" && <Icon name="user" size={28} color={color} />} */}
      {route.name === "advancedsearch" && <Icon name="zoom-in" size={28} color={color} />}
    </Pressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
