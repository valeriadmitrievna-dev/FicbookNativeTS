import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useMemo } from "react";
import { ExtendedTheme, useRoute, useTheme } from "@react-navigation/native";
import { ICollection } from "../interfaces";
import CustomText from "./CustomText";

interface CollectionProps {
  collection: ICollection;
  navigation: any;
  style?: ViewStyle;
}

export default function Collection({
  collection,
  navigation,
  style,
}: CollectionProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const route = useRoute();

  return (
    <View style={[styles.block, style]}>
      <View style={styles.row}>
        <CustomText
          weight="500Medium"
          color={theme.colors.textInvert}
          size={16}
          width="70%"
          underlined
        >
          {collection.title}
        </CustomText>
        <CustomText
          weight="600SemiBold"
          color={theme.colors.textInvert}
          size={16}
        >
          {collection.count}
        </CustomText>
      </View>
      {route.name !== "author" && (
        <CustomText color={theme.colors.textInvert} italic>
          {collection.author.name}
        </CustomText>
      )}
    </View>
  );
}

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    block: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      backgroundColor: theme.colors.tertiary,
      marginBottom: 8,
    },
    row: {
      alignItems: "flex-start",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },
  });
