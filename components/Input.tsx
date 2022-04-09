import { StyleSheet, TextInput, TextStyle, ViewStyle } from "react-native";
import React, { useMemo } from "react";
import { ExtendedTheme, useTheme } from "@react-navigation/native";

interface InputProps {
  value: string;
  onChange: (el: string) => void;
  placeholder?: string;
  onPressIn?: () => void;
  style?: (ViewStyle & TextStyle) | (ViewStyle[] & TextStyle[]);
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "ascii-capable"
    | "numbers-and-punctuation"
    | "url"
    | "number-pad"
    | "name-phone-pad"
    | "decimal-pad"
    | "twitter"
    | "web-search"
    | "visible-password";
}

const Input = ({
  value,
  onChange,
  placeholder,
  onPressIn,
  style,
  keyboardType = "default",
}: InputProps) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <TextInput
      style={[styles.container, styles.input, style]}
      selectionColor={theme.colors.card}
      placeholder={placeholder}
      placeholderTextColor={theme.colors.text}
      onPressIn={onPressIn}
      onChangeText={onChange}
      value={value}
      keyboardType={keyboardType}
    />
  );
};

export default React.memo(Input);

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 2,
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 6,
      borderColor: theme.colors.text,
      position: "relative",
    },
    input: {
      color: theme.colors.text,
      fontSize: 16,
      lineHeight: 18,
      fontFamily: "Montserrat_400Regular",
    },
  });
