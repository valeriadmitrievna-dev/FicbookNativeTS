import { StyleSheet, View, TouchableOpacity } from "react-native";
import React, {  useMemo, useState } from "react";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import CustomText from "../components/CustomText";
import BackButton from "../components/BackButton";
import API from "../api";
import { ITag } from "../interfaces";
import Tag from "../components/Tag";
import PageContainer from "../components/PageContainer";
import NavigatedList from "../components/NavigatedList";
import { usePromise } from "../hooks/usePromise";

export default function Tags() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [page, setPage] = useState<number>(1);

  const onNextPage = () => setPage(page + 1);
  const onPrevPage = () => setPage(page - 1);

  const getTags = API.get(`/tags?p=${page}`).then(d => d.data);
  const [{ tags, pages }, error, pending] = usePromise(getTags, {}, [page]);

  return (
    <PageContainer>
      <View style={styles.row}>
        <CustomText weight="600SemiBold" size={18}>
          Теги
        </CustomText>
        <BackButton round />
      </View>
      <NavigatedList
        currentPage={page}
        pages={pages}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
        isLoading={pending}
        data={tags || []}
        renderItem={(item: ITag, id: number) => (
          <TouchableOpacity style={styles.tag} key={id}>
            <View style={[styles.row, { justifyContent: "flex-start" }]}>
              <Tag
                tag={item}
                onPress={() => {}}
                size={15}
                style={{ marginBottom: 0 }}
              />
              <CustomText weight="500Medium" ml={8}>x </CustomText>
              <CustomText weight="500Medium">{item.count}</CustomText>
            </View>
            <CustomText>{item.description}</CustomText>
          </TouchableOpacity>
        )}
      />
    </PageContainer>
  );
}

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginBottom: 20,
    },
    row: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    tag: {
      marginBottom: 16,
    },
  });
