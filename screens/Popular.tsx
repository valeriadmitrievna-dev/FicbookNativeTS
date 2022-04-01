import { Pressable, StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
import PageContainer from "../components/PageContainer";
import CustomText from "../components/CustomText";
import HowTo from "../components/HowTo";
import { IFanfic, IRatingNumber } from "../interfaces";
import API from "../api";
import SmallLoader from "../components/SmallLoader";
import Fanfic from "../components/Fanfic";
import { useNavigation, useTheme } from "@react-navigation/native";
import { directions, sex, DirectionList } from "../utils/variables";
import { colors } from "../utils/colors";
import Direction from "../components/Direction";
import { usePromise } from "../hooks/usePromise";

export default function Popular() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [direction, setDirection] = useState<DirectionList | "">("");

  const getPopular = API.get("/popular/" + direction).then(d => d.data);
  const [{ fanfics, ratings }, error, pending] = usePromise(getPopular, {}, [
    direction,
  ]);

  const getDirection = useCallback((d: DirectionList) => {
    if (d !== direction) {
      setDirection(!!sex[d] ? d : "");
    }
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

      {!pending ? (
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
          {fanfics.map((fic: IFanfic, id: number) => (
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
