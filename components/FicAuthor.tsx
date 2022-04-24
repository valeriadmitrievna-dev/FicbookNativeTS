import { Pressable, StyleSheet, Image, View, ViewStyle } from "react-native";
import React, { useMemo } from "react";
import {
  ExtendedTheme,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { IAuthor } from "../interfaces";
import CustomText from "./CustomText";

interface FicAuthorProps {
  author: IAuthor;
  style?: ViewStyle;
  scale?: number;
}

export default function FicAuthor({
  author,
  style,
  scale = 1,
}: FicAuthorProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<any>();

  const getAuthor = () => {
    navigation.push("author", { id: author.id });
  };

  return (
    <Pressable style={[styles.container, style]} onPress={getAuthor}>
      <Image source={{ uri: author.avatar }} style={[styles.avatar, {
        width: 36 * scale,
        height: 36 * scale,
        borderRadius: 36 * scale,
      }]} />
      <View>
        <CustomText
          line={24 * scale}
          size={15 * scale}
          underlined
          weight="500Medium"
        >
          {author.name}
        </CustomText>
        <CustomText italic size={12 * scale} line={14 * scale}>
          {author.info}
        </CustomText>
      </View>
    </Pressable>
  );
}

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 18,
      marginBottom: 14,
    },
    avatar: {
      borderWidth: 2,
      borderColor: theme.colors.card,
      marginRight: 8,
    },
  });
