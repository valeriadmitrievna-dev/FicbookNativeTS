import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import CustomText from "./CustomText";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import { hexToRgb } from "../utils/functions";

interface HowToProps {
  title: string;
  items: string[];
}

export default function HowTo({ title, items }: HowToProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={styles.info}>
      <CustomText weight="500Medium" mb={8} size={16}>
        {title}
      </CustomText>
      {items.map((text, id) => (
        <CustomText
          ml={4}
          mb={id === items.length - 1 ? 0 : 4}
          key={`howto_${id}`}
        >
          &bull; {text}
        </CustomText>
      ))}
    </View>
  );
}

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    info: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      backgroundColor: `rgba(${hexToRgb(theme.colors.card)}, 0.5)`,
      marginBottom: 10,
    },
  });
