import { StyleSheet, ActivityIndicator, View, ViewStyle } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

interface SmallLoaderProps {
  style?: ViewStyle;
  size?: number;
}

export default function SmallLoader({ style, size }: SmallLoaderProps) {
  const theme = useTheme();
  return (
    <View style={[styles.loading, style]}>
      <ActivityIndicator color={theme.colors.text} size={size || 30} />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
