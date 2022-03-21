import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer";
import CustomText from "../components/CustomText";
import HowTo from "../components/HowTo";
import { IFanfic, IRatingNumber } from "../interfaces";
import API from "../api";
import SmallLoader from "../components/SmallLoader";
import Fanfic from "../components/Fanfic";
import { useNavigation } from "@react-navigation/native";

export default function Popular() {
  const navigation = useNavigation();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [fanfics, setFanfics] = useState<IFanfic[]>([]);
  const [ratings, setRatings] = useState<IRatingNumber[]>([]);

  const getPopular = async () => {
    try {
      const { data } = await API.get("/popular");
      setFanfics(data.works);
      setRatings(data.ratings);
    } catch (error: any) {
      console.log(error.message);
    }
    setLoaded(true);
  };

  useEffect(() => {
    getPopular();
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
      <View style={styles.space} />
      {loaded && !!fanfics.length && !!ratings.length ? (
        <>
          {fanfics.map((fic, id) => (
            <Fanfic
              fanfic={fic}
              rating_number={ratings[id]}
              navigation={navigation}
              key={`fanfic_${fic.id}`}
            />
          ))}
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
});
