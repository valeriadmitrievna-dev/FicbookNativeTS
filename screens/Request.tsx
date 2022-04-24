import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useMemo, useState } from "react";
import {
  ExtendedTheme,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import PageContainer from "../components/PageContainer";
import BackButton from "../components/BackButton";
import { IFanfic, IRequest } from "../interfaces";
import CustomText from "../components/CustomText";
import Icon from "react-native-vector-icons/Ionicons";
import API from "../api";
import { usePromise } from "../hooks/usePromise";
import SmallLoader from "../components/SmallLoader";
import TextArray from "../components/TextArray";
import Tags from "../components/Tags";
import NavigatedList from "../components/NavigatedList";
import Fanfic from "../components/Fanfic";
import FicAuthor from "../components/FicAuthor";
import MiniRequest from "../components/Request";

interface RequestProps {
  route: any;
}

type Tabs = "works" | "similar";
const tabs = [
  { key: "works", value: "Написанные работы" },
  { key: "similar", value: "Похожие заявки" },
];

export default function Request({ route }: RequestProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<any>();

  const request: IRequest = route?.params?.request;
  const [activeTab, setActiveTab] = useState<Tabs>("works");
  const [page, setPage] = useState<number>(1);

  const getRequest = API.get(`/request/${request.id}?p=${page}`).then(
    d => d.data
  );
  const [
    {
      title,
      author,
      tags,
      descriptions,
      count,
      fandoms,
      directions,
      ratings,
      works,
      pages,
      hot,
    },
    error,
    pending,
  ] = usePromise(getRequest, {}, [page]);

  const getSimilar = API.get(`/request/${request.id}/similar`).then(
    d => d.data
  );
  const [similar, similarError, similarPending] = usePromise(
    getSimilar,
    {},
    [activeTab],
    activeTab === "similar"
  );

  return (
    <PageContainer>
      <View style={styles.header}>
        {(request.hot || hot) && (
          <View style={styles.hot}>
            <Icon name="flame-outline" size={16} />
            <CustomText weight="500Medium" ml={4}>
              Горячая заявка
            </CustomText>
          </View>
        )}
        <BackButton style={{ marginLeft: "auto" }} />
      </View>
      <CustomText weight="600SemiBold" size={18} mt={16}>
        {request.title || title}
      </CustomText>
      {pending ? (
        <SmallLoader style={{ flexGrow: 1 }} />
      ) : (
        <>
          <FicAuthor author={author} scale={1.1} style={{ marginTop: 24 }} />
          <CustomText weight="500Medium" mt={8} size={16} underlined mb={6}>
            Желаемые характеристики
          </CustomText>
          <Text style={{ marginBottom: 4 }}>
            <CustomText weight="500Medium">Фэндом:</CustomText>{" "}
            <TextArray array={fandoms} title="title" onPress={() => {}} />
          </Text>
          <Text style={{ marginBottom: 4 }}>
            <CustomText weight="500Medium">Направленности:</CustomText>{" "}
            <TextArray array={directions} title="" />
          </Text>
          <Text style={{ marginBottom: 8 }}>
            <CustomText weight="500Medium">Рейтинг:</CustomText>{" "}
            <TextArray array={ratings} title="" />
          </Text>
          <Tags tags={tags} />
          {descriptions?.map((desc: { title: string; content: string }) => (
            <>
              <CustomText weight="500Medium" mt={12}>
                {desc.title}
              </CustomText>
              <CustomText mt={12}>{desc.content}</CustomText>
            </>
          ))}
          <View style={styles.space} />
          {tabs.map((tab: { key: Tabs; value: string }) => (
            <TouchableOpacity
              style={[
                styles.tab,
                {
                  backgroundColor:
                    tab.key === activeTab
                      ? theme.colors.tertiary
                      : theme.colors.card,
                },
              ]}
              onPress={() => setActiveTab(tab.key)}
            >
              <CustomText weight="500Medium">{tab.value}</CustomText>
              {tab.key === "works" && (
                <CustomText weight="500Medium">{count}</CustomText>
              )}
            </TouchableOpacity>
          ))}
          <View style={styles.space} />
          {activeTab === "works" && (
            <>
              <NavigatedList
                currentPage={page}
                pages={pages}
                onNextPage={() => setPage(page + 1)}
                onPrevPage={() => setPage(page - 1)}
                data={works}
                renderItem={(item: IFanfic) => (
                  <Fanfic fanfic={item} navigation={navigation} />
                )}
              />
              <View style={styles.space} />
            </>
          )}
          {activeTab === "similar" &&
            (similarPending ? (
              <SmallLoader />
            ) : (
              <>
                {similar.map((r: IRequest) => (
                  <MiniRequest request={r} navigation={navigation} />
                ))}
                <View style={styles.space} />
              </>
            ))}
        </>
      )}
    </PageContainer>
  );
}

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    hot: {
      paddingVertical: 3,
      paddingHorizontal: 10,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.hot,
      borderRadius: 3,
    },
    tab: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      alignItems: "center",
      flexDirection: "row",
      marginBottom: 2,
      justifyContent: "space-between",
    },
    space: {
      height: 24,
    },
  });
