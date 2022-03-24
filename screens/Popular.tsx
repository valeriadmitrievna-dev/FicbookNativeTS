import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import CustomText from "../components/CustomText";
import HowTo from "../components/HowTo";
import { IFanfic, IRatingNumber } from "../interfaces";
import API from "../api";
import SmallLoader from "../components/SmallLoader";
import Fanfic from "../components/Fanfic";
import { useNavigation, useTheme } from "@react-navigation/native";
import { directions, sex, DirectionList } from "../utils/variables";
import { colors } from "../utils/colors";;
import Direction from "../components/Direction";

export default function Popular() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [fanfics, setFanfics] = useState<IFanfic[]>([]);
  const [ratings, setRatings] = useState<IRatingNumber[]>([]);
  const [direction, setDirection] = useState<DirectionList>("all");

  const getPopular = async (d: DirectionList | "") => {
    setLoaded(false);
    try {
      const { data } = await API.get("/popular/" + d);
      setFanfics(data.works);
      setRatings(data.ratings);
    } catch (error: any) {
      console.log(error.message);
    }
    setLoaded(true);
  };

  const getDirection = (d: DirectionList) => {
    if (d !== direction) {
      setDirection(d);
      const _d = !!sex[d] ? d : "";
      getPopular(_d);
    }
  };

  useEffect(() => {
    getPopular("");
  }, []);

  return (
    <PageContainer>
      <CustomText size={18} weight="600SemiBold" mb={16}>
        Популярные работы
      </CustomText>
      <HowTo
        title="Как работы попадают в этот список"
        items={[
          "Работы сортируются по количеству оценок «нравится», полученных работой за последние 7 дней;",
          "Работы с самым высоким рейтингом оказываются наверху;",
          "В подсчете рейтинга участвуют все работы независимо от фэндома или размера;",
          "Рейтинг пересчитывается раз в сутки.",
        ]}
      />

      {loaded && !!fanfics.length && !!ratings.length ? (
        <>
          <View style={styles.directions}>
            {directions.map(d => (
              <Pressable
                style={[
                  styles.direction,
                  { backgroundColor: colors.direction[d] },
                ]}
                key={`direction-${d}`}
                onPress={() => getDirection(d)}
              >
                {!!sex[d] ? (
                  <Direction
                    direction={d}
                    color={theme.colors.background}
                    size={18}
                  />
                ) : (
                  <CustomText weight="500Medium">Все</CustomText>
                )}
              </Pressable>
            ))}
          </View>
          {fanfics.map((fic, id) => (
            <Fanfic
              fanfic={fic}
              rating_number={ratings[id]}
              navigation={navigation}
              key={`fanfic_${fic.id}`}
            />
          ))}
          <View style={styles.space} />
          <View style={styles.space} />
        </>
      ) : (
        <SmallLoader />
      )}
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  space: {
    height: 20,
  },
  directions: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  direction: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 16,
    marginTop: 8,
    borderRadius: 3,
  },
});
