import React, { useMemo, useState } from "react";
import { StyleSheet, TextInput, ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import API from "../api";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import SmallLoader from "./SmallLoader";
import { usePromise } from "../hooks/usePromise";
import CustomText from "./CustomText";
import Input from "./Input";

interface SuggestibleInputProps {
  url: string;
  placeholder: string;
  item: (data: any, id: number, array: any[]) => JSX.Element;
  style?: ViewStyle;
  dropdown?: ViewStyle;
}

export default function SuggestibleInput({
  url,
  placeholder,
  item,
  style,
  dropdown
}: SuggestibleInputProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [query, setQuery] = useState("");

  const height = useSharedValue(0);
  const offset = useSharedValue(0);
  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };
  const animatedStyles = useAnimatedStyle(() => {
    return {
      maxHeight: withTiming(height.value, config),
      overflow: "hidden",
      marginTop: withTiming(offset.value, config),
    };
  });

  const getResults = API.post(url, {
    query: query.replace(/\s\s+/g, " ").trim(),
  }).then(d => d.data);
  const [{ results }, error, pending] = usePromise(getResults, [], [query]);

  return (
    <>
      <Input
        style={[styles.container, styles.input, style]}
        placeholder={placeholder}
        onPressIn={() => {
          if (height.value) {
            height.value = 0;
            offset.value = 0
          } else {
            height.value = 10000;
            offset.value = 5
          }
        }}
        onChange={setQuery}
        value={query}
      />
      <Animated.View style={[styles.dropdown, dropdown, animatedStyles]}>
        {!pending ? (
          !!results?.length ? (
            results.map(item)
          ) : (
            <CustomText ml={16} mt={10} mb={10}>
              Совпадений не найдено
            </CustomText>
          )
        ) : (
          <SmallLoader />
        )}
      </Animated.View>
    </>
  );
}

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 2,
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 6,
      borderColor: theme.colors.text,
      position: "relative",
    },
    input: {
      color: theme.colors.text,
      fontSize: 16,
      lineHeight: 18,
      fontFamily: "Montserrat_400Regular",
    },
    dropdown: {
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
    },
  });
