import { StyleSheet, ActivityIndicator, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

export default function SmallLoader() {
  const theme = useTheme();
  return (
    <View style={styles.loading}>
      <ActivityIndicator color={theme.colors.text} size={30} />
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
