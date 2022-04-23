import {
  ColorValue,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React, { useMemo } from "react";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import CustomText from "./CustomText";
import Icon from "react-native-vector-icons/Feather";

interface ActionButtonProps {
  opacity?: boolean;
  children?: string;
  icon?: string;
  left?: boolean;
  color?: ColorValue;
  size?: number;
  style?: ViewStyle;
  colored?: boolean;
  action: () => void;
}

export default function ActionButton({
  opacity = false,
  children,
  icon,
  left = false,
  color,
  size = 15,
  style,
  colored = false,
  action
}: ActionButtonProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const Component = opacity ? TouchableOpacity : Pressable;

  const _color = colored
    ? theme.colors.background
    : color || theme.colors.tertiary;

  return (
    <Component
      style={[
        styles.button,
        {
          backgroundColor: colored
            ? color || theme.colors.tertiary
            : "transparent",
          borderWidth: colored ? 0 : 2,
          borderColor: _color
        },
        style,
      ]}
      onPress={action}
    >
      {!!icon && left && <Icon name={icon} color={_color} size={size + 1} />}
      {!!children && (
        <CustomText center size={size} color={_color} weight="600SemiBold">
          {children}
        </CustomText>
      )}
      {!!icon && !left && <Icon name={icon} color={_color} size={size + 1} />}
    </Component>
  );
}

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    button: {
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderWidth: 3,
      borderRadius: 2,
      borderColor: theme.colors.tertiary,
      alignSelf: "center",
    },
  });
