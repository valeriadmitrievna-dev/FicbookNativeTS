import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ExtendedTheme,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import CustomText from "../components/CustomText";
import { IFandom, IFanfic } from "../interfaces";
import PageContainer from "../components/PageContainer";
import BackButton from "../components/BackButton";
import API from "../api";
import Fanfic from "../components/Fanfic";
import Icon from "react-native-vector-icons/Feather";
import {
  DirectionList,
  directions,
  ratings,
  RatingList,
} from "../utils/variables";
import { usePromise } from "../hooks/usePromise";
import ScreenLoader from "../components/ScreenLoader";
import Picker from "../components/Picker";

type DirectionPicker = "any direction" | DirectionList;
type RatingPicker = "any rating" | RatingList;

interface FandomProps {
  route: any;
}

const Fandom = ({ route }: FandomProps) => {
  const navigation = useNavigation<any>();
  const _fandom: IFandom = route?.params?.fandom;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [page, setPage] = useState<number>(1);

  const [direction, setDirection] = useState<DirectionPicker>("any direction");
  const [rating, setRating] = useState<RatingPicker>("any rating");

  const getFandom = API.get(
    `/fandom/${_fandom.group}/${_fandom.slug}/${page}`
  ).then(d => d.data);
  const [{ fandom, fanfics, pages }, error, pending] = usePromise(
    getFandom,
    {},
    [page]
  );

  useEffect(() => {
    if (!_fandom) {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.push("main");
      }
    }
  }, []);

  return (
    <PageContainer fullHeight>
      <>
        {!pending && !!fandom ? (
          <>
            <View style={styles.header}>
              <CustomText
                weight="600SemiBold"
                size={22}
                line={28}
                mt={6}
                width="80%"
              >
                {fandom.title}
              </CustomText>
              <BackButton />
            </View>
            {!!fandom.subtitle && (
              <CustomText italic width="90%" mb={16}>
                {fandom.subtitle}
              </CustomText>
            )}
            <Picker
              data={[
                { key: "any direction", value: "любое направление" },
                ...directions,
              ]}
              selectedValue={direction}
              onValueChange={(value: DirectionPicker) => setDirection(value)}
              style={{ marginBottom: 8 }}
            />
            <Picker
              data={[{ key: "any rating", value: "любой рейтинг" }, ...ratings]}
              selectedValue={rating}
              onValueChange={(value: RatingPicker) => setRating(value)}
            />
            <View style={[styles.navigation, { marginTop: 24 }]}>
              <Pressable
                style={[styles.navbutton, { opacity: page <= 1 ? 0.5 : 1 }]}
                disabled={page <= 1}
              >
                <Icon name="chevron-left" size={18} />
                <CustomText weight="500Medium">Назад</CustomText>
              </Pressable>
              <Text style={{ textDecorationLine: "underline" }}>
                <CustomText ml={8}>{page}</CustomText>
                <CustomText> из </CustomText>
                <CustomText mr={8}>{pages}</CustomText>
              </Text>
              <Pressable
                style={[
                  styles.navbutton,
                  { opacity: page === pages ? 0.5 : 1 },
                ]}
                disabled={page === pages}
              >
                <CustomText weight="500Medium">Вперед</CustomText>
                <Icon name="chevron-right" size={18} />
              </Pressable>
            </View>
            <View style={styles.works}>
              {fanfics?.map((fanfic: IFanfic) => (
                <Fanfic
                  key={fanfic.id}
                  fanfic={fanfic}
                  navigation={navigation}
                />
              ))}
            </View>
            <View style={[styles.navigation, { marginBottom: 72 }]}>
              <Pressable
                style={[styles.navbutton, { opacity: page <= 1 ? 0.5 : 1 }]}
                disabled={page <= 1}
              >
                <Icon name="chevron-left" size={18} />
                <CustomText weight="500Medium">Назад</CustomText>
              </Pressable>
              <Text style={{ textDecorationLine: "underline" }}>
                <CustomText ml={8}>{page}</CustomText>
                <CustomText> из </CustomText>
                <CustomText mr={8}>{pages}</CustomText>
              </Text>
              <Pressable
                style={[
                  styles.navbutton,
                  { opacity: page === pages ? 0.5 : 1 },
                ]}
                disabled={page === pages}
              >
                <CustomText weight="500Medium">Вперед</CustomText>
                <Icon name="chevron-right" size={18} />
              </Pressable>
            </View>
          </>
        ) : (
          <ScreenLoader />
        )}
      </>
    </PageContainer>
  );
};

export default React.memo(Fandom);

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    works: {
      marginBottom: 24,
      marginTop: 24,
    },
    navigation: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    navbutton: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 4,
      backgroundColor: theme.colors.card,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: 120,
    },
  });
