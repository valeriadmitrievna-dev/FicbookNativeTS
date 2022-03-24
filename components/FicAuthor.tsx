import { Pressable, StyleSheet, Image, View } from "react-native";
import React, { useMemo } from "react";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import { IAuthor } from "../interfaces";
import CustomText from "./CustomText";

interface FicAuthorProps {
  author: IAuthor;
}

export default function FicAuthor({ author }: FicAuthorProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const getAuthor = () => {
    console.log(author.name);
    console.log(author.id);
  };

  return (
    <Pressable style={styles.container} onPress={getAuthor}>
      <Image source={{ uri: author.avatar }} style={styles.avatar} />
      <View>
        <CustomText line={24} underlined weight="500Medium">
          {author.name}
        </CustomText>
        <CustomText italic size={12} line={14}>
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
      width: 36,
      height: 36,
      borderRadius: 22,
      borderWidth: 2,
      borderColor: theme.colors.card,
      marginRight: 8,
    },
  });
