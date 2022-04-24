import { StyleSheet, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import {
  ExtendedTheme,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import PageContainer from "../components/PageContainer";
import BackButton from "../components/BackButton";
import CustomText from "../components/CustomText";
import { IFanfic, ITag } from "../interfaces";
import API from "../api";
import { usePromise } from "../hooks/usePromise";
import SmallLoader from "../components/SmallLoader";
import NavigatedList from "../components/NavigatedList";
import Fanfic from "../components/Fanfic";

export default function Tag({ route }) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<any>();

  const [page, setPage] = useState<number>(1);

  const tag: ITag = route?.params?.tag;
  const getWorks = API.get(`/tag/${tag.id}/works`).then(d => d.data);
  const [{ works, pages }, error, pending] = usePromise(getWorks, [], []);

  return (
    <PageContainer>
      <View style={[styles.row, { marginBottom: 16 }]}>
        <CustomText weight="600SemiBold" size={18} width="80%">
          {tag.title}
        </CustomText>
        <BackButton round />
      </View>
      <View style={styles.block}>
        <CustomText size={16} mb={8}>
          {tag.description}
        </CustomText>
        {!!tag.synonyms && (
          <Text>
            <CustomText>Синонимы: </CustomText>
            <CustomText italic>{tag.synonyms}</CustomText>
          </Text>
        )}
      </View>
      {pending ? (
        <SmallLoader />
      ) : (
        <NavigatedList
          currentPage={page}
          pages={pages}
          onNextPage={() => setPage(page + 1)}
          onPrevPage={() => setPage(page - 1)}
          data={works}
          renderItem={(f: IFanfic) => (
            <Fanfic fanfic={f} navigation={navigation} />
          )}
          listStyle={{ marginVertical: 24 }}
        />
      )}
    </PageContainer>
  );
}

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    row: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    block: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      backgroundColor: theme.colors.secondary,
    },
  });
