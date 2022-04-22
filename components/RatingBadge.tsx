import { ColorValue, View, ViewStyle } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { RatingList } from "../utils/variables";
import { colors } from "../utils/colors";
import CustomText from "./CustomText";

interface RatingBadgeProps {
  rating: RatingList;
  size?: number;
  color?: ColorValue;
  style?: ViewStyle;
}

export default function RatingBadge({
  rating,
  size,
  color,
  style,
}: RatingBadgeProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          paddingVertical: 2,
          paddingHorizontal: 6,
          borderRadius: 4,
          backgroundColor: colors.rating[rating],
        },
        style,
      ]}
    >
      <CustomText
        size={size}
        color={color || theme.colors.primary}
        weight="500Medium"
      >
        {rating}
      </CustomText>
    </View>
  );
}
