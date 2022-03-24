import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import React, { useMemo, useState } from "react";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import { ITag } from "../interfaces";
import Tag from "./Tag";
import CustomText from "./CustomText";
import { hexToRgb } from "../utils/functions";

interface TagsProps {
  tags: ITag[];
  style?: ViewStyle;
}

export default function Tags({ tags, style }: TagsProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [tagsList, setTagsList] = useState<ITag[]>(
    tags.filter(t => !t.spoiler)
  );

  const showSpoilers = () => {
    setTagsList(tags.sort((a, b) => Number(a.spoiler) - Number(b.spoiler)));
  };

  return (
    <View style={[styles.tags, style]}>
      {tagsList.map(t => (
        <Tag tag={t} key={t.id + Math.round(Math.random() * 10000)} />
      ))}
      {tags.length !== tagsList.length && (
        <TouchableOpacity style={styles.spoilers} onPress={showSpoilers}>
          <CustomText size={13} weight="600SemiBold">
            Спойлеры...
          </CustomText>
        </TouchableOpacity>
      )}
    </View>
  );
}

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    tags: {
      flexDirection: "row",
      alignItems: "stretch",
      flexWrap: "wrap",
    },
    spoilers: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 4,
      paddingBottom: 4,
      // backgroundColor: `rgba(${hexToRgb(theme.colors.card)}, 0.5)`,
    },
  });
