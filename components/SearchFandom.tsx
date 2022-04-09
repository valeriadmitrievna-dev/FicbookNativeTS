import React, { useMemo, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import CustomText from "./CustomText";
import API from "../api";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import SmallLoader from "./SmallLoader";
import { hexToRgb } from "../utils/functions";
import { IFandom } from "../interfaces";
import { usePromise } from "../hooks/usePromise";
import SuggestibleInput from "./SuggestibleInput";

export default function SearchFandom({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SuggestibleInput
      url="/search"
      placeholder="Поиск по фандому"
      item={(data: IFandom, id: number, array: any[]) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("fandom", {
              fandom: data,
            });
          }}
          style={[
            styles.fandom,
            {
              borderBottomWidth: id + 1 === array.length ? 0 : 1,
            },
          ]}
          key={data.id}
        >
          <CustomText weight="700Bold">{data.title.trim()}</CustomText>
          <CustomText>{data.subtitle}</CustomText>
        </TouchableOpacity>
      )}
    />
  );
}

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    fandom: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderBottomWidth: 2,
      borderBottomColor: `rgba(${hexToRgb(theme.colors.text)}, 0.3)`,
    },
  });
