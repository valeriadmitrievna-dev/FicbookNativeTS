import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MIcon from "react-native-vector-icons/MaterialIcons";
import { DirectionList, directions } from "../utils/variables";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import { colors } from "../utils/colors";
import CustomText from "./CustomText";

interface DirectionProps {
  direction: DirectionList;
  color?: string;
  size: number;
  inside?: boolean;
  insideStyle?: ViewStyle;
  titled?: boolean;
}

export default function Direction({
  direction,
  color,
  size,
  inside,
  insideStyle,
  titled,
}: DirectionProps) {
  const theme = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <View
      style={[
        inside && {
          ...styles.inside,
          backgroundColor: colors.direction[direction],
          alignSelf: "flex-start",
        },
        insideStyle,
      ]}
    >
      {direction === "het" && (
        <FAIcon
          name="venus-mars"
          color={
            color ||
            (inside ? theme.colors.primary : colors.direction[direction])
          }
          size={size}
        />
      )}
      {direction === "gen" && (
        <MCIcon
          name="sword"
          color={
            color ||
            (inside ? theme.colors.primary : colors.direction[direction])
          }
          size={size}
        />
      )}
      {direction === "femslash" && (
        <FAIcon
          name="venus-double"
          color={
            color ||
            (inside ? theme.colors.primary : colors.direction[direction])
          }
          size={size}
        />
      )}
      {direction === "slash" && (
        <FAIcon
          name="mars-double"
          color={
            color ||
            (inside ? theme.colors.primary : colors.direction[direction])
          }
          size={size}
        />
      )}
      {direction === "mixed" && (
        <MCIcon
          name="gender-transgender"
          color={
            color ||
            (inside ? theme.colors.primary : colors.direction[direction])
          }
          size={size}
        />
      )}
      {direction === "other" && (
        <FAIcon
          name="circle-notch"
          color={
            color ||
            (inside ? theme.colors.primary : colors.direction[direction])
          }
          size={size}
        />
      )}
      {direction === "article" && (
        <MIcon
          name="article"
          color={
            color ||
            (inside ? theme.colors.primary : colors.direction[direction])
          }
          size={size}
        />
      )}
      {titled && (
        <CustomText
          color={
            color ||
            (inside ? theme.colors.primary : colors.direction[direction])
          }
          weight="500Medium"
          ml={6}
        >
          {directions.find(d => d.key === direction).value}
        </CustomText>
      )}
    </View>
  );
}

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    inside: {
      paddingVertical: 2,
      paddingHorizontal: 6,
      borderRadius: 4,
      flexDirection: "row",
      alignItems: "center",
    },
  });
