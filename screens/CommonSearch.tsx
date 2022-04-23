import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import {
  ExtendedTheme,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import CustomText from "../components/CustomText";
import PageContainer from "../components/PageContainer";
import BackButton from "../components/BackButton";
import API from "../api";
import { usePromise } from "../hooks/usePromise";
import Icon from "react-native-vector-icons/Feather";
import TextArray from "../components/TextArray";
import Direction from "../components/Direction";
import { directions_by_numbers } from "../utils/variables";
import { colors } from "../utils/colors";

const CommonSearch = () => {
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [query, setQuery] = useState<string>("");

  const search =
    query.length >= 2 &&
    API.post("/search/all", { term: query }).then(d => d.data);
  const [{ collections, fanfics, users, requests, fandoms }, error, pending] =
    usePromise(search, {}, [query]);

  const getFanfic = (id: string) => {
    navigation.push("fanfic", { id });
  };
  const getFandom = (f: any) => {
    navigation.push("fandom", {
      fandom: {
        title: f.title,
        subtitle: f.sec_title,
        group: f.group_crazy_title,
        slug: f.slug,
      },
    });
  };
  const getAuthor = (id: string) => {
    navigation.push("author", { id });
  };

  return (
    <PageContainer fullHeight>
      <View style={styles.header}>
        <CustomText weight="600SemiBold" size={20} line={20}>
          Поиск
        </CustomText>
        <BackButton round />
      </View>
      <TextInput
        value={query}
        onChangeText={setQuery}
        selectionColor={theme.colors.text}
        placeholder="Начните писать..."
        placeholderTextColor={theme.colors.text}
        style={styles.input}
      />
      {!!collections && !!collections?.count && (
        <>
          <CustomText weight="500Medium" size={18} mb={12}>
            Сборники
          </CustomText>
          {collections.data.map((c: any) => (
            <Pressable style={styles.itemDefault}>
              <View style={styles.itemHeaderRow}>
                <Icon name="layers" size={16} color={theme.colors.primary} />
                <CustomText
                  ml={6}
                  underlined
                  weight="500Medium"
                  color={theme.colors.primary}
                >
                  {c.name}
                </CustomText>
              </View>
              <CustomText
                size={14}
                weight="500Medium"
                color={theme.colors.primary}
              >
                {c.author_nickname}
              </CustomText>
            </Pressable>
          ))}
          {collections.count > 3 && (
            <Pressable style={styles.all}>
              <Text>
                <CustomText color={theme.colors.primary}>Все </CustomText>
                <CustomText color={theme.colors.primary}>
                  {collections?.count}
                </CustomText>
              </Text>
            </Pressable>
          )}
        </>
      )}
      {!!fandoms && !!fandoms?.count && (
        <>
          <CustomText weight="500Medium" size={18} mb={12}>
            Фэндомы
          </CustomText>
          {fandoms.data.map((f: any) => (
            <Pressable style={styles.itemDefault} onPress={() => getFandom(f)}>
              <View
                style={[styles.itemHeaderRow, { alignItems: "flex-start" }]}
              >
                <Icon
                  name="book"
                  size={16}
                  color={theme.colors.primary}
                  style={{ marginTop: 2 }}
                />
                <CustomText
                  ml={6}
                  underlined
                  weight="500Medium"
                  color={theme.colors.primary}
                >
                  {f.title}
                </CustomText>
              </View>
              <CustomText size={14} ml={22} italic color={theme.colors.primary}>
                {f.sec_title}
              </CustomText>
            </Pressable>
          ))}
          {fandoms.count > 3 && (
            <Pressable style={styles.all}>
              <Text>
                <CustomText color={theme.colors.primary}>Все </CustomText>
                <CustomText color={theme.colors.primary}>
                  {fandoms?.count}
                </CustomText>
              </Text>
            </Pressable>
          )}
        </>
      )}
      {!!requests && !!requests?.count && (
        <>
          <CustomText weight="500Medium" size={18} mb={12}>
            Заявки
          </CustomText>
          {requests.data.map((r: any) => (
            <Pressable style={styles.itemDefault}>
              <CustomText
                mb={4}
                underlined
                weight="500Medium"
                color={theme.colors.primary}
              >
                {r.title}
              </CustomText>
              <Text>
                <Icon name="book" size={14} color={theme.colors.primary} />{" "}
                <TextArray
                  array={r.fandoms}
                  title="title"
                  size={14}
                  color={theme.colors.primary}
                />
              </Text>
            </Pressable>
          ))}
          {requests.count > 3 && (
            <Pressable style={styles.all}>
              <Text>
                <CustomText color={theme.colors.primary}>Все </CustomText>
                <CustomText color={theme.colors.primary}>
                  {requests?.count}
                </CustomText>
              </Text>
            </Pressable>
          )}
        </>
      )}
      {!!fanfics && !!fanfics?.count && (
        <>
          <CustomText weight="500Medium" size={18} mb={12}>
            Фанфики и Ориджиналы
          </CustomText>
          {fanfics.data.map((f: any) => (
            <Pressable
              style={[
                styles.itemDefault,
                {
                  borderLeftWidth: 6,
                  borderLeftColor:
                    colors.direction[directions_by_numbers[f.direction]],
                },
              ]}
              onPress={() => getFanfic(f.id)}
            >
              <View style={styles.itemHeaderRow}>
                <Direction
                  direction={directions_by_numbers[f.direction]}
                  color={colors.direction[directions_by_numbers[f.direction]]}
                  size={16}
                />
                <CustomText
                  ml={6}
                  underlined
                  weight="500Medium"
                  color={theme.colors.primary}
                >
                  {f.title}
                </CustomText>
              </View>
              <View style={[styles.header, { marginBottom: 6 }]}>
                <Text>
                  <Icon name="user" size={14} color={theme.colors.primary} />{" "}
                  <CustomText color={theme.colors.primary}>
                    {f.author_nickname}
                  </CustomText>
                </Text>
                <CustomText weight="500Medium" color={theme.colors.primary}>
                  {f.rating.title}
                </CustomText>
              </View>
              <Text>
                <Icon name="book" size={14} color={theme.colors.primary} />{" "}
                <TextArray
                  array={f.fandoms}
                  title="title"
                  size={14}
                  color={theme.colors.primary}
                />
              </Text>
            </Pressable>
          ))}
          {fanfics.count > 3 && (
            <Pressable style={styles.all}>
              <Text>
                <CustomText color={theme.colors.primary}>Все </CustomText>
                <CustomText color={theme.colors.primary}>
                  {fanfics?.count}
                </CustomText>
              </Text>
            </Pressable>
          )}
        </>
      )}
      {!!users && !!users?.count && (
        <>
          <CustomText weight="500Medium" size={18} mb={4}>
            Пользователи
          </CustomText>
          <View
            style={[
              styles.itemHeaderRow,
              { marginBottom: 0, flexWrap: "wrap" },
            ]}
          >
            {users.data.map((u: any) => (
              <Pressable style={styles.user} onPress={() => getAuthor(u.id)}>
                <Image source={{ uri: u.avatar_path }} style={styles.avatar} />
                <CustomText weight="500Medium" ml={6}>
                  {u.nickname}
                </CustomText>
              </Pressable>
            ))}
          </View>
          {users.count > 3 && (
            <Pressable style={styles.all}>
              <Text>
                <CustomText color={theme.colors.primary}>Все </CustomText>
                <CustomText color={theme.colors.primary}>
                  {users?.count}
                </CustomText>
              </Text>
            </Pressable>
          )}
        </>
      )}
    </PageContainer>
  );
};

export default React.memo(CommonSearch);

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    input: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 2,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderColor: theme.colors.text,
      color: theme.colors.text,
      fontSize: 16,
      lineHeight: 18,
      fontFamily: "Montserrat_400Regular",
      marginBottom: 16,
    },
    all: {
      backgroundColor: theme.colors.text,
      paddingVertical: 4,
      paddingHorizontal: 10,
      alignSelf: "flex-start",
      marginBottom: 24,
    },
    itemHeaderRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 4,
    },
    itemDefault: {
      backgroundColor: theme.colors.text,
      marginBottom: 12,
      paddingVertical: 6,
      paddingHorizontal: 10,
    },
    user: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 20,
      marginBottom: 20,
    },
    avatar: {
      width: 42,
      height: 42,
      borderRadius: 21,
      borderWidth: 2,
      borderColor: theme.colors.text,
    },
  });
