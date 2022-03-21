import { StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import CustomText from "./CustomText";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import { ITag } from "../interfaces";
import { hexToRgb } from "../utils/functions";

interface TagProps {
  tag: ITag;
}

export default function Tag({ tag }: TagProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View
      style={[
        styles.tag,
        {
          backgroundColor: tag.adult
            ? theme.colors.card
            : `rgba(${hexToRgb(theme.colors.card)}, 0.75)`,
        },
      ]}
    >
      <CustomText size={13} weight={tag.adult ? "600SemiBold" : "500Medium"}>
        {tag.title}
        {tag.adult ? " 18+" : ""}
      </CustomText>
    </View>
  );
}

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    tag: {
      marginRight: 5,
      marginBottom: 5,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 4,
      paddingTop: 2
    },
  });
