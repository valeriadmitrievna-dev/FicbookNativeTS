import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { ExtendedTheme, useTheme } from "@react-navigation/native";

export default function SuggestibleInput() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View>
      <Text></Text>
    </View>
  );
}

const createStyles = (theme: ExtendedTheme) => StyleSheet.create({});
