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
import { hexToRgb } from "../utils/functions";
import { usePromise } from "../hooks/usePromise";

interface SuggestibleInputProps {
  url: string;
  placeholder: string;
  item: (data: any, id: number, array: any[]) => JSX.Element;
  style?: ViewStyle;
}

export default function SuggestibleInput({
  url,
  placeholder,
  item,
  style,
}: SuggestibleInputProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [query, setQuery] = useState("");

  const height = useSharedValue(0);
  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };
  const animatedStyles = useAnimatedStyle(() => {
    return {
      maxHeight: withTiming(height.value, config),
      overflow: "hidden",
    };
  });

  const getResults = API.post(url, {
    query: query.replace(/\s\s+/g, " ").trim(),
  }).then(d => d.data);
  const [{ results }, error, pending] = usePromise(getResults, [], [query]);

  return (
    <>
      <TextInput
        style={[styles.container, styles.input, style]}
        selectionColor={theme.colors.text}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text}
        onPressIn={() => {
          if (height.value) {
            height.value = 0;
          } else {
            height.value = 10000;
          }
        }}
        onChangeText={setQuery}
        value={query}
      />
      <Animated.View style={[styles.dropdown, animatedStyles]}>
        {!pending && !!results?.length ? results.map(item) : <SmallLoader />}
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
      marginTop: 5,
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
    },
  });
