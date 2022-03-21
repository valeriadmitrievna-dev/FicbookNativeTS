import { ExtendedTheme, useTheme } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function ScreenLoader() {
  const theme = useTheme() as ExtendedTheme;
  return (
    <View style={styles.container}>
      <ActivityIndicator size={80} color={theme.colors.text} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
