import { Image, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import { IAuthor, IFandom, IFanfic, IRatingNumber } from "../interfaces";
import CustomText from "./CustomText";
import { colors } from "../utils/colors";
import Icon from "react-native-vector-icons/Ionicons";
import Tag from "./Tag";
import Tags from "./Tags";
import TextArray from "./TextArray";

interface FanficProps {
  fanfic: IFanfic;
  navigation: any;
  rating_number?: IRatingNumber;
}

export default function Fanfic({
  fanfic,
  navigation,
  rating_number,
}: FanficProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const pressAuthor = (a: IAuthor) => {
    console.log(a.name);
  };
  const pressTitle = () => {
    navigation.push("fanfic", {
      id: fanfic.id,
    });
  };
  const pressFandom = (f: IFandom) => {
    navigation.push("fandom", {
      fandom: f,
    });
  };

  return (
    <>
      {!!rating_number && (
        <Text>
          <CustomText mb={6} weight="500Medium">
            №
          </CustomText>
          <CustomText mb={6} weight="500Medium">
            {rating_number.number}
          </CustomText>
          <CustomText mb={6} weight="500Medium">
            —
          </CustomText>
          <CustomText mb={6} weight="500Medium">
            {rating_number.count}
          </CustomText>
          <CustomText mb={6} weight="500Medium">
            оценок за 7 дней
          </CustomText>
        </Text>
      )}
      <View
        style={[
          styles.container,
          {
            borderLeftColor: colors.direction[fanfic.direction.value],
            borderTopLeftRadius: !!rating_number ? 0 : 6,
            borderTopEndRadius: !!rating_number ? 0 : 6,
          },
        ]}
      >
        <View style={styles.badges}>
          <View
            style={[
              styles.badge,
              {
                borderBottomLeftRadius: 0,
                backgroundColor: colors.direction[fanfic.direction.value],
              },
            ]}
          >
            <CustomText
              weight="500Medium"
              size={13}
              color={theme.colors.primary}
            >
              {fanfic.direction.title}
            </CustomText>
          </View>
          {!!fanfic.translated && (
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: colors.blueHEX,
                },
              ]}
            >
              <Icon
                name="globe-outline"
                size={14}
                color={theme.colors.primary}
              />
            </View>
          )}
          <View
            style={[
              styles.badge,
              {
                backgroundColor: colors.rating[fanfic.rating.value],
              },
            ]}
          >
            <CustomText
              size={13}
              weight="500Medium"
              color={theme.colors.primary}
            >
              {fanfic.rating.value}
            </CustomText>
          </View>
          <View
            style={[
              styles.badge,
              {
                backgroundColor: colors.status[fanfic.status.value],
              },
            ]}
          >
            <CustomText
              size={13}
              weight="500Medium"
              color={colors.statusesText[fanfic.status.value]}
            >
              {fanfic.status.title}
            </CustomText>
          </View>
          <View
            style={[
              styles.badge,
              {
                backgroundColor: colors.greenAccentHEX,
              },
            ]}
          >
            <Icon name="thumbs-up" size={12} color={theme.colors.primary} />
            <CustomText
              size={13}
              weight="500Medium"
              color={theme.colors.primary}
              ml={4}
            >
              {fanfic.likes.title}
            </CustomText>
          </View>
          {!!fanfic.rewards.value && (
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: colors.yellowAccentHEX,
                },
              ]}
            >
              <Icon name="trophy" size={12} color={theme.colors.primary} />
              <CustomText
                size={13}
                weight="500Medium"
                color={theme.colors.primary}
                ml={4}
              >
                {fanfic.rewards.value}
              </CustomText>
            </View>
          )}
          {!!fanfic.hot && (
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: colors.orangeHEX,
                  marginLeft: "auto",
                  marginRight: 0,
                  borderBottomEndRadius: 0,
                },
              ]}
            >
              <Icon name="flame" size={16} color={theme.colors.primary} />
            </View>
          )}
        </View>
        <View style={styles.content}>
          {!!fanfic.cover && (
            <Image source={{ uri: fanfic.cover }} style={styles.cover} />
          )}
          <CustomText
            weight="600SemiBold"
            size={17}
            mb={6}
            mt={4}
            onPress={pressTitle}
            underlined
          >
            {fanfic.title}
          </CustomText>
          <Text style={{ marginBottom: 4 }}>
            <CustomText weight="500Medium">Авторы:</CustomText>{" "}
            <TextArray
              array={fanfic.authors}
              title="name"
              onPress={pressAuthor}
            />
          </Text>
          <Text style={{ marginBottom: 4 }}>
            <CustomText weight="500Medium">Фэндом:</CustomText>{" "}
            <TextArray
              array={fanfic.fandoms}
              title="title"
              onPress={pressFandom}
            />
          </Text>
          {!!fanfic.pairings?.length && (
            <Text style={{ marginBottom: 4 }}>
              <CustomText weight="500Medium">Пэйринг и персонажи:</CustomText>{" "}
              <TextArray array={fanfic.pairings} title="title" />
            </Text>
          )}
          <Text style={{ marginBottom: 4 }}>
            <CustomText weight="500Medium">Размер:</CustomText>{" "}
            <CustomText>{fanfic.size}</CustomText>
          </Text>
          {!!fanfic.date && (
            <Text style={{ marginBottom: 8 }}>
              <CustomText weight="500Medium">{fanfic.date.title}</CustomText>{" "}
              <CustomText>{fanfic.date.text}</CustomText>
            </Text>
          )}
          {!!fanfic.tags?.length && <Tags tags={fanfic.tags} />}
          <View style={styles.line} />
          <CustomText>{fanfic.description}</CustomText>
        </View>
      </View>
    </>
  );
}

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      paddingBottom: 8,
      backgroundColor: theme.colors.primary,
      marginBottom: 16,
      borderRadius: 4,
      borderLeftWidth: 6,
    },
    badges: {
      flexDirection: "row",
      marginBottom: 6,
    },
    badge: {
      paddingHorizontal: 6,
      paddingTop: 1,
      paddingBottom: 3,
      borderBottomLeftRadius: 3,
      borderBottomEndRadius: 3,
      backgroundColor: theme.colors.card,
      marginRight: 4,
      flexDirection: "row",
      alignItems: "center",
    },
    content: {
      paddingHorizontal: 12,
    },
    rating: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    line: {
      height: 2,
      backgroundColor: theme.colors.text,
      marginTop: 5,
      marginBottom: 10,
    },
    cover: {
      width: "100%",
      height: 275,
      borderRadius: 4,
    },
  });
