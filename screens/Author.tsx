import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import React, { useMemo, useState } from "react";
import {
  ExtendedTheme,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import PageContainer from "../components/PageContainer";
import CustomText from "../components/CustomText";
import BackButton from "../components/BackButton";
import API from "../api";
import { usePromise } from "../hooks/usePromise";
import SmallLoader from "../components/SmallLoader";
import { IAuthor, ICollection, IFanfic, IRequest } from "../interfaces";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthorTabKey, author_tabs } from "../utils/variables";
import Fanfic from "../components/Fanfic";
import Request from "../components/Request";
import Picker from "../components/Picker";
import ActionButton from "../components/ActionButton";
import NavigatedList from "../components/NavigatedList";
import Collection from "../components/Collection";

interface AuthorProps {
  route: any;
}

export default function Author({ route }: AuthorProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const id: string = route?.params?.id;
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState<AuthorTabKey>("info");

  const getAuthor = API.get(`/author/${id}`).then(d => d.data);
  const [author, error, pending] = usePromise<IAuthor>(getAuthor, {}, []);

  const [fandom, setFandom] = useState<string>("");
  const [direction, setDirection] = useState<string>("");
  const [sorting, setSorting] = useState<string>("3");
  const [options, setOptions] = useState<string[]>(["", "", "3"]);
  const [page, setPage] = useState<number>(1);

  const getWorks = API.get(
    `/author/${id}/works?fandom=${options[0]}&direction=${options[1]}&sort=${options[2]}&p=${page}`
  ).then(d => d.data);
  const [
    { works, pages, fandoms, directions, sort },
    worksError,
    worksPending,
  ] = usePromise(
    getWorks,
    {},
    [activeTab, options, page],
    activeTab === "works"
  );

  const updateOptions = () => {
    setOptions([fandom, direction, sorting]);
  };
  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page - 1);

  const getBeta = API.get(`/author/${id}/beta?fandom=${fandom}`).then(
    d => d.data
  );
  const [beta, betaError, betaPending] = usePromise(
    getBeta,
    {},
    [activeTab, fandom],
    activeTab === "beta"
  );

  const getCoauthor = API.get(`/author/${id}/coauthor?fandom=${fandom}`).then(
    d => d.data
  );
  const [coauthor, coauthorError, coauthorPending] = usePromise(
    getCoauthor,
    {},
    [activeTab, fandom],
    activeTab === "coauthor"
  );

  const getRequests = API.get(`/author/${id}/requests`).then(d => d.data);
  const [requests, requestsError, requestsPending] = usePromise(
    getRequests,
    {},
    [activeTab],
    activeTab === "requests"
  );

  const getCollections = API.get(`/author/${id}/collections`).then(d => d.data);
  const [collections, collectionsError, collectionsPending] = usePromise(
    getCollections,
    {},
    [activeTab],
    activeTab === "collections"
  );

  return (
    <PageContainer>
      <View style={styles.row}>
        <CustomText weight="600SemiBold" size={18}>
          Автор
        </CustomText>
        <BackButton round />
      </View>
      {pending ? (
        <SmallLoader style={{ flexGrow: 1 }} />
      ) : (
        <>
          <View
            style={[
              styles.row,
              { justifyContent: "flex-start", marginBottom: 16 },
            ]}
          >
            <Image source={{ uri: author.avatar }} style={styles.avatar} />
            <CustomText size={16} weight="500Medium" ml={12}>
              {author.name}
            </CustomText>
          </View>
          <View>
            {author_tabs.map(tab =>
              !!author.counts[tab.key] || tab.required ? (
                <TouchableOpacity
                  style={[
                    styles.link,
                    {
                      backgroundColor:
                        tab.key === activeTab
                          ? theme.colors.tertiary
                          : theme.colors.card,
                    },
                  ]}
                  onPress={() => {
                    setFandom("");
                    setActiveTab(tab.key);
                  }}
                >
                  <Icon name={tab.icon} color={theme.colors.text} size={16} />
                  <CustomText weight="500Medium" ml={6}>
                    {tab.title}
                  </CustomText>
                  {!tab.required && (
                    <CustomText
                      weight="500Medium"
                      style={{ marginLeft: "auto" }}
                    >
                      {author.counts[tab.key]}
                    </CustomText>
                  )}
                </TouchableOpacity>
              ) : (
                <></>
              )
            )}
          </View>
          {activeTab === "info" && (
            <View>
              {author.description.map(d => (
                <>
                  <CustomText size={16} weight="500Medium" mt={16}>
                    {d.title}
                  </CustomText>
                  <CustomText size={16} mt={8}>
                    {d.text}
                  </CustomText>
                </>
              ))}
              <View style={{ marginTop: 24 }}>
                {!!author.counts.works &&
                  author.works.map((w: IFanfic) => (
                    <Fanfic fanfic={w} navigation={navigation} />
                  ))}
              </View>
              <View style={{ marginTop: 24, marginBottom: 64 }}>
                {!!author.counts.requests &&
                  author.requests.map((r: IRequest) => (
                    <Request request={r} navigation={navigation} />
                  ))}
              </View>
            </View>
          )}
          {activeTab === "works" &&
            (worksPending ? (
              <SmallLoader />
            ) : (
              <View style={{ marginTop: 24 }}>
                <Picker
                  data={fandoms}
                  selectedValue={fandom}
                  onValueChange={value => setFandom(value as string)}
                  style={{ marginBottom: 4, paddingVertical: 6 }}
                />
                <Picker
                  data={directions}
                  selectedValue={direction}
                  onValueChange={value => setDirection(value as string)}
                  style={{ marginBottom: 4, paddingVertical: 6 }}
                />
                <Picker
                  data={sort}
                  selectedValue={sorting}
                  onValueChange={value => setSorting(value as string)}
                  style={{ marginBottom: 4, paddingVertical: 6 }}
                />
                <ActionButton
                  opacity
                  colored
                  style={{
                    marginTop: 8,
                    paddingVertical: 6,
                    paddingHorizontal: 24,
                  }}
                  action={updateOptions}
                >
                  Показать
                </ActionButton>
                <NavigatedList
                  currentPage={page}
                  pages={pages}
                  onNextPage={nextPage}
                  onPrevPage={prevPage}
                  isLoading={worksPending}
                  renderItem={(item: IFanfic, id: number) => (
                    <Fanfic fanfic={item} navigation={navigation} />
                  )}
                  data={works}
                  listStyle={{ marginTop: 24, marginBottom: 36 }}
                />
              </View>
            ))}
          {activeTab === "beta" &&
            (betaPending ? (
              <SmallLoader />
            ) : (
              <View style={{ marginTop: 24 }}>
                <Picker
                  data={beta.fandoms}
                  selectedValue={fandom}
                  onValueChange={value => setFandom(value as string)}
                  style={{ marginBottom: 4, paddingVertical: 6 }}
                />
                <NavigatedList
                  currentPage={1}
                  pages={1}
                  onNextPage={nextPage}
                  onPrevPage={prevPage}
                  isLoading={betaPending}
                  renderItem={(item: IFanfic, id: number) => (
                    <Fanfic fanfic={item} navigation={navigation} />
                  )}
                  data={beta.works}
                  listStyle={{ marginTop: 24, marginBottom: 36 }}
                />
              </View>
            ))}
          {activeTab === "coauthor" &&
            (coauthorPending ? (
              <SmallLoader />
            ) : (
              <View style={{ marginTop: 24 }}>
                <Picker
                  data={coauthor.fandoms}
                  selectedValue={fandom}
                  onValueChange={value => setFandom(value as string)}
                  style={{ marginBottom: 4, paddingVertical: 6 }}
                />
                <NavigatedList
                  currentPage={1}
                  pages={1}
                  onNextPage={nextPage}
                  onPrevPage={prevPage}
                  isLoading={coauthorPending}
                  renderItem={(item: IFanfic, id: number) => (
                    <Fanfic fanfic={item} navigation={navigation} />
                  )}
                  data={coauthor.works}
                  listStyle={{ marginTop: 24, marginBottom: 36 }}
                />
              </View>
            ))}
          {activeTab === "requests" &&
            (requestsPending ? (
              <SmallLoader />
            ) : (
              <View style={{ marginVertical: 24 }}>
                {requests.map((r: IRequest) => (
                  <Request request={r} navigation={navigation} />
                ))}
              </View>
            ))}
          {activeTab === "collections" &&
            (collectionsPending ? (
              <SmallLoader />
            ) : (
              <View style={{ marginVertical: 24 }}>
                {collections.map((c: ICollection) => (
                  <Collection collection={c} navigation={navigation} />
                ))}
              </View>
            ))}
        </>
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
      marginBottom: 8,
    },
    avatar: {
      width: 52,
      height: 52,
      borderRadius: 52,
      borderWidth: 2,
      borderColor: theme.colors.tertiary,
    },
    link: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      alignItems: "center",
      flexDirection: "row",
      marginBottom: 2,
    },
  });
