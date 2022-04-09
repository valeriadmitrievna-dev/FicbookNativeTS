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
import Picker from "../components/Picker";
import SmallLoader from "../components/SmallLoader";
import Navigation from "../components/Navigation";

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
  const [options, setOptions] = useState<[number | "", number | ""]>(["", ""]);

  const getFandom = API.get(
    `/fandom/${_fandom.group}/${_fandom.slug}/${page}?filterDirection=${options[0]}&rating=${options[1]}`
  ).then(d => d.data);
  const [{ fandom, fanfics, pages }, error, pending] = usePromise(
    getFandom,
    {},
    [page, options]
  );

  const nextPage = () => {
    setPage(page + 1);
  };
  const prevPage = () => {
    setPage(page - 1);
  };

  const getDirectionKey = (direction: DirectionPicker) => {
    if (direction === "gen") return 1;
    if (direction === "het") return 2;
    if (direction === "slash") return 3;
    if (direction === "femslash") return 4;
    if (direction === "article") return 5;
    if (direction === "mixed") return 6;
    if (direction === "other") return 7;
    else return "";
  };
  const getRatingKey = (rating: RatingPicker) => {
    if (rating === "G") return 5;
    if (rating === "PG-13") return 6;
    if (rating === "R") return 7;
    if (rating === "NC-17") return 8;
    if (rating === "NC-21") return 9;
    else return "";
  };
  const updateOptions = () => {
    const d_key = getDirectionKey(direction);
    const r_key = getRatingKey(rating);
    setOptions([d_key, r_key]);
  };

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
        <View style={styles.header}>
          <CustomText
            weight="600SemiBold"
            size={22}
            line={28}
            mt={6}
            width="80%"
          >
            {fandom?.title || _fandom.title}
          </CustomText>
          <BackButton />
        </View>
        {(!!fandom?.subtitle || !!_fandom.subtitle) && (
          <CustomText italic width="90%" mb={16}>
            {fandom?.subtitle || _fandom.subtitle}
          </CustomText>
        )}
        {!pending && !!fandom ? (
          <>
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
            <Pressable
              style={styles.button}
              disabled={pending}
              onPress={updateOptions}
            >
              <CustomText weight="500Medium">Показать результаты</CustomText>
            </Pressable>
            <Navigation
              currentPage={page}
              pages={pages}
              onNextPage={nextPage}
              onPrevPage={prevPage}
              style={{ marginTop: 24 }}
              isLoading={pending}
            />
            <View style={styles.works}>
              {fanfics?.map((fanfic: IFanfic) => (
                <Fanfic
                  key={fanfic.id}
                  fanfic={fanfic}
                  navigation={navigation}
                />
              ))}
            </View>
            <Navigation
              currentPage={page}
              pages={pages}
              onNextPage={nextPage}
              onPrevPage={prevPage}
              style={{ marginBottom: 72 }}
              isLoading={pending}
            />
          </>
        ) : (
          <SmallLoader style={{ flex: 1 }} />
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
    button: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 3,
      alignSelf: "center",
      marginTop: 14,
      borderWidth: 2,
      borderColor: theme.colors.text,
    },
  });
