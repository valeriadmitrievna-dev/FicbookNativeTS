import { TouchableOpacity, StyleSheet, View, ViewStyle } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import { ITag } from "../interfaces";
import Tag from "./Tag";
import CustomText from "./CustomText";

interface TagsProps {
  tags: ITag[];
  style?: ViewStyle;
  onPress?: (tag: ITag) => void;
  spoilers?: boolean;
}

const Tags = ({ tags, style, onPress, spoilers }: TagsProps) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [tagsList, setTagsList] = useState<ITag[]>(
    tags.filter(t => (spoilers ? true : !t.spoiler))
  );

  const showSpoilers = useCallback(() => {
    setTagsList(tags.sort((a, b) => Number(a.spoiler) - Number(b.spoiler)));
  }, []);

  return (
    <View style={[styles.tags, style]}>
      {tagsList.map(t => (
        <Tag
          tag={t}
          key={`tag_${t.id}_${Math.round(Math.random() * 10000)}`}
          onPress={onPress}
        />
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
};

export default React.memo(Tags);

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
