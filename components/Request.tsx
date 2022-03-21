import { StyleSheet, View, Text } from "react-native";
import React, { useMemo } from "react";
import CustomText from "./CustomText";
import Icon from "react-native-vector-icons/Feather";
// import Tag from "./Tag";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import { IFandom, IRequest, ITag } from "../interfaces";
import Tag from "./Tag";

interface RequestProps {
  request: IRequest;
  navigation: any;
}

export default function Request({ request, navigation }: RequestProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const pressFandom = (f: IFandom) => {
    navigation.navigate("fandom", {
      group: f.group,
      slug: f.slug,
      title: f.title,
    });
  };
  return (
    <View style={styles.container}>
      {request.hot && (
        <View style={styles.hot}>
          <CustomText weight="500Medium">Горячая заявка</CustomText>
        </View>
      )}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Icon name="thumbs-up" size={14} color={theme.colors.text} />
          <CustomText> {request.likes}</CustomText>
        </View>
        <View style={styles.headerIcon}>
          <Icon name="star" size={14} color={theme.colors.text} />
          <CustomText> {request.bookmarks}</CustomText>
        </View>
        <View style={styles.headerIcon}>
          <Icon name="book" size={14} color={theme.colors.text} />
          <CustomText> {request.works}</CustomText>
        </View>
      </View>
      <CustomText
        weight="500Medium"
        size={17}
        mb={5}
        textDecorationLine="underline"
      >
        {request.title}
      </CustomText>
      <Text style={{ marginBottom: 5 }}>
        <Icon name="book" size={14} color={theme.colors.text} />
        {request.fandoms.map((f, id) => (
          <Text key={id} style={{ color: theme.colors.text }}>
            {" "}
            <CustomText
              ml={5}
              textDecorationLine="underline"
              onPress={() => pressFandom(f)}
            >
              {f.title}
            </CustomText>
            {request.fandoms.length - 1 !== id ? ", " : ""}
          </Text>
        ))}
      </Text>
      <Text style={{ marginBottom: 5 }}>
        <CustomText textDecorationLine="underline">Рейтинг:</CustomText>{" "}
        {request.ratings.map((r, id) => (
          <CustomText>
            {r}
            {id !== request.ratings.length - 1 && ", "}
          </CustomText>
        ))}
      </Text>
      {!!request.tags?.length && (
        <View style={styles.tags}>
          {request.tags.map((tag: ITag) => (
            <Tag tag={tag} key={tag.id} />
          ))}
        </View>
      )}
      <View style={styles.line} />
      <CustomText>{request.content}</CustomText>
    </View>
  );
}

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginBottom: 10,
      borderRadius: 8,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 6,
    },
    tags: {
      flexDirection: "row",
      alignItems: "stretch",
      flexWrap: "wrap",
    },
    line: {
      width: "100%",
      height: 1,
      backgroundColor: theme.colors.text,
      marginTop: 5,
      marginBottom: 10,
    },
    headerIcon: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 10,
    },
    hot: {
      position: "absolute",
      right: 0,
      top: 0,
      backgroundColor: theme.colors.hot,
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderBottomLeftRadius: 6,
    },
  });
