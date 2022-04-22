import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import {
  ExtendedTheme,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import PageContainer from "../components/PageContainer";
import CustomText from "../components/CustomText";
import Icon from "react-native-vector-icons/Feather";
import Collapsible from "../components/Collapsible";
import RatingBadge from "../components/RatingBadge";
import {
  RatingList,
  ratings_data,
  directions_data,
  DirectionList,
} from "../utils/variables";
import Direction from "../components/Direction";

const Info = () => {
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [opened, setOpened] = useState<string>("");

  const open = (id: string) => {
    if (opened !== id) setOpened(id);
    else close();
  };
  const close = () => {
    setOpened("");
  };

  return (
    <PageContainer>
      <View style={styles.card}>
        <View style={styles.row}>
          <Icon name="alert-circle" color={theme.colors.text} size={20} />
          <CustomText weight="600SemiBold" ml={6}>
            Важная информация
          </CustomText>
        </View>
        <CustomText mt={4}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          dolorum esse neque odio id officiis deserunt unde, dolorem
          voluptatibus molestiae saepe nihil expedita consequatur! Molestias
          dolorem accusamus culpa soluta!
        </CustomText>
      </View>
      <Collapsible
        title="Рейтинги"
        style={styles.collapsible}
        icon="star"
        bodyStyle={{ paddingVertical: 0, paddingHorizontal: 0 }}
        opened={opened === "collapsible_0"}
        open={open}
        id="collapsible_0"
      >
        {ratings_data.map((r, id) => (
          <>
            <View style={styles.infoRow}>
              <RatingBadge
                rating={r.value as RatingList}
                style={{ alignSelf: "flex-start" }}
              />
              <CustomText mt={4}>{r.description}</CustomText>
            </View>
            {id !== ratings_data.length - 1 && <View style={styles.line} />}
          </>
        ))}
      </Collapsible>
      <Collapsible
        title="Направленности"
        style={styles.collapsible}
        icon="transgender-alt"
        bodyStyle={{ paddingVertical: 0, paddingHorizontal: 0 }}
        opened={opened === "collapsible_1"}
        open={open}
        id="collapsible_1"
      >
        {directions_data.map((d, id) => (
          <>
            <View style={styles.infoRow}>
              <Direction
                direction={d.value as DirectionList}
                size={18}
                inside
                titled
              />
              <CustomText mt={4}>{d.description}</CustomText>
            </View>
            {id !== directions_data.length - 1 && <View style={styles.line} />}
          </>
        ))}
      </Collapsible>
      <View style={styles.card}>
        <View style={styles.row}>
          <Icon name="tag" size={16} color={theme.colors.text} />
          <CustomText ml={6} weight="600SemiBold">
            Теги
          </CustomText>
        </View>
        <CustomText mt={4}>
          Получите весь список тегов и информацию о них с примерами работ
        </CustomText>
        <Pressable style={styles.link} onPress={() => navigation.push("tags")}>
          <CustomText mr={6}>Перейти</CustomText>
          <Icon name="arrow-right" size={16} color={theme.colors.text} />
        </Pressable>
      </View>
    </PageContainer>
  );
};

export default React.memo(Info);

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.card,
      paddingVertical: 6,
      paddingHorizontal: 12,
      marginBottom: 6,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    collapsible: {
      marginBottom: 6,
    },
    infoRow: {
      paddingVertical: 6,
      paddingHorizontal: 8,
    },
    line: {
      height: 1,
      backgroundColor: theme.colors.text,
      marginTop: 6,
    },
    link: {
      paddingVertical: 3,
      paddingHorizontal: 8,
      borderRadius: 4,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.primary,
      alignSelf: "flex-end",
    },
  });
