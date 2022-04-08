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

export default function SearchFandom({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [query, setQuery] = useState("");

  const height = useSharedValue(0);
  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };
  const style = useAnimatedStyle(() => {
    return {
      maxHeight: withTiming(height.value, config),
      overflow: "hidden",
    };
  });

  const getResults = API.post("/search", {
    query: query.replace(/\s\s+/g, " ").trim(),
  }).then(d => d.data);
  const [{ results }, error, pending] = usePromise(getResults, [], [query]);

  return (
    <>
      <TextInput
        style={[styles.container, styles.input]}
        selectionColor={theme.colors.text}
        placeholder="Поиск по фандому"
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
      <Animated.View style={[styles.dropdown, style]}>
        {!pending && !!results?.length ? (
          results.map((f: IFandom, id: number) => (
            <TouchableOpacity
              onPress={() => {
                setQuery("");
                navigation.navigate("fandom", {
                  fandom: f,
                });
                height.value = 0;
              }}
              style={[
                styles.fandom,
                {
                  borderBottomWidth: id + 1 === results.length ? 0 : 1,
                },
              ]}
              key={f.id}
            >
              <CustomText weight="700Bold">{f.title.trim()}</CustomText>
              <CustomText>{f.subtitle}</CustomText>
            </TouchableOpacity>
          ))
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
      marginTop: 5,
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
    },
    fandom: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderBottomWidth: 2,
      borderBottomColor: `rgba(${hexToRgb(theme.colors.text)}, 0.3)`,
    },
  });
