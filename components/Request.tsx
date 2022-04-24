import { StyleSheet, View, Text } from "react-native";
import React, { useMemo } from "react";
import CustomText from "./CustomText";
import Icon from "react-native-vector-icons/Feather";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import { IFandom, IRequest } from "../interfaces";
import Tags from "./Tags";
import TextArray from "./TextArray";

interface RequestProps {
  request: IRequest;
  navigation: any;
}

export default function Request({ request, navigation }: RequestProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const pressFandom = (f: IFandom) => {
    navigation.push("fandom", {
      fandom: f,
    });
  };

  const goToRequest = () => {
    navigation.push("request", { request });
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
          <CustomText ml={4}>{request.likes}</CustomText>
        </View>
        <View style={styles.headerIcon}>
          <Icon name="star" size={14} color={theme.colors.text} />
          <CustomText ml={4}>{request.bookmarks}</CustomText>
        </View>
        <View style={styles.headerIcon}>
          <Icon name="book" size={14} color={theme.colors.text} />
          <CustomText ml={4}>{request.works}</CustomText>
        </View>
      </View>
      <CustomText
        weight="500Medium"
        size={17}
        mb={5}
        underlined
        onPress={goToRequest}
      >
        {request.title}
      </CustomText>
      <Text style={{ marginBottom: 5 }}>
        <Icon name="book" size={14} color={theme.colors.text} />
        <TextArray
          array={request.fandoms}
          title={"title"}
          onPress={pressFandom}
          underlined
        />
      </Text>
      <Text style={{ marginBottom: 6 }}>
        <CustomText underlined>Рейтинг:</CustomText>{" "}
        <TextArray array={request.ratings} title="" />
      </Text>
      {!!request.tags?.length && <Tags tags={request.tags} />}
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
      marginRight: 14,
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
