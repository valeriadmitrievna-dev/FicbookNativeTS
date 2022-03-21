import React, { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Pressable,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { ExtendedTheme, useNavigation, useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import Direction from "react-native-vector-icons/FontAwesome5";
// import { useDispatch } from "react-redux";
import CustomText from "./CustomText";
// import { disableScroll, enableScroll } from "../redux/root";
import API from "../api";
import SmallLoader from "./SmallLoader";
import { hexToRgb } from "../utils/functions";
import { colors } from "../utils/colors";

export default function SearchFanfic() {
  const navigation = useNavigation();
  const [isSearchOpen, setSearchOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isEmpty, setEmpty] = useState<boolean>(false);
  const [term, setTerm] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  // const dispatch = useDispatch();

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const open = () => {
    setSearchOpen(true);
    // dispatch(disableScroll());
  };

  const close = () => {
    setSearchOpen(false);
    // dispatch(enableScroll());
  };

  const getFanfic = (id: string) => {
    navigation.navigate("fanfic" as never, {
      source: id,
    } as never);
    close();
  };
  const getFandom = (group: string, slug: string) => {
    navigation.navigate("fandom" as never, {
      group,
      slug,
    } as never);
    close();
  };
  const getAuthor = (id: string) => {
    navigation.navigate("author" as never, {
      id,
    } as never);
    close();
  };

  const fetchResults = async () => {
    setLoading(true);
    try {
      const { data } = await API.post("/search/all", { term });
      setEmpty(data.data.every((d: any) => !d.data.length));
      setResults(data.data);
    } catch (error: any) {
      console.log(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (term.trim().length >= 2) {
      fetchResults();
    }
  }, [term]);

  return (
    <>
      <TouchableOpacity style={styles.searchButton} onPress={open}>
        <Icon name="search" color={theme.colors.text} size={20} />
      </TouchableOpacity>
      {isSearchOpen && (
        <View style={styles.overflow}>
          <View style={styles.header}>
            <CustomText weight="700Bold" size={26}>
              Поиск по Фикбуку
            </CustomText>
            <Pressable onPress={close}>
              <Icon name="x-circle" color={theme.colors.text} size={35} />
            </Pressable>
          </View>
          <TextInput
            style={[styles.container, styles.input]}
            selectionColor={theme.colors.card}
            placeholder="Введите первые два символа..."
            placeholderTextColor={theme.colors.text}
            value={term}
            onChangeText={setTerm}
          />
          {isLoading ? (
            <SmallLoader />
          ) : isEmpty ? (
            <CustomText weight="500Medium" size={16}>
              Увы, поиск не дал результатов
            </CustomText>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              {!!results.find(r => r.type === "fanfic")?.data.length && (
                <>
                  <CustomText mb={10} mt={10} weight="600SemiBold" size={16}>
                    Фанфики и Ориджиналы
                  </CustomText>
                  {results
                    .find(r => r.type === "fanfic")
                    .data.map((fanfic: any) => (
                      <Fanfic
                        key={fanfic.id}
                        fanfic={fanfic}
                        press={getFanfic}
                        styles={styles}
                        theme={theme}
                      />
                    ))}
                </>
              )}

              {!!results.find(r => r.type === "fandom")?.data.length && (
                <>
                  <CustomText mb={10} mt={10} weight="600SemiBold" size={16}>
                    Фандомы
                  </CustomText>
                  {results
                    .find(r => r.type === "fandom")
                    .data.map((fandom: any) => (
                      <Fandom
                        key={fandom.id}
                        fandom={fandom}
                        press={getFandom}
                        styles={styles}
                        theme={theme}
                      />
                    ))}
                </>
              )}

              {!!results.find(r => r.type === "request")?.data.length && (
                <>
                  <CustomText mb={10} mt={10} weight="600SemiBold" size={16}>
                    Заявки
                  </CustomText>
                  {results
                    .find(r => r.type === "request")
                    .data.map((request: any) => (
                      <Request
                        key={request.id}
                        request={request}
                        styles={styles}
                        theme={theme}
                      />
                    ))}
                </>
              )}

              {!!results.find(r => r.type === "user")?.data.length && (
                <>
                  <CustomText mb={10} mt={10} weight="600SemiBold" size={16}>
                    Пользователи
                  </CustomText>
                  {results
                    .find(r => r.type === "user")
                    .data.map((user: any) => (
                      <User
                        key={user.id}
                        user={user}
                        press={getAuthor}
                        styles={styles}
                        theme={theme}
                      />
                    ))}
                </>
              )}

              <View style={styles.space} />
            </ScrollView>
          )}
        </View>
      )}
    </>
  );
}

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    searchButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: 40,
      height: 40,
      borderRadius: 8,
      backgroundColor: theme.colors.card,
    },
    overflow: {
      position: "absolute",
      left: 0,
      top: 0,
      backgroundColor: `rgba(${hexToRgb(theme.colors.background)}, 0.95)`,
      width: "100%",
      height: Dimensions.get("window").height - 65,
      zIndex: 5,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
      backgroundColor: theme.colors.background,
      paddingBottom: 1,
    },
    container: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 2,
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 10,
      borderColor: theme.colors.text,
      position: "relative",
      backgroundColor: theme.colors.primary,
      marginBottom: 10,
    },
    input: {
      color: theme.colors.text,
      fontSize: 16,
      lineHeight: 18,
      fontFamily: "Montserrat_400Regular",
    },
    fandom: {
      backgroundColor: theme.colors.primary,
      marginBottom: 10,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderLeftWidth: 5,
      borderLeftColor: theme.colors.card,
    },
    fanfic: {
      backgroundColor: theme.colors.primary,
      marginBottom: 10,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderLeftWidth: 6,
    },
    request: {
      backgroundColor: theme.colors.primary,
      marginBottom: 10,
      paddingVertical: 6,
      paddingHorizontal: 10,
    },
    user: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      paddingVertical: 5,
    },
    avatar: {
      width: 30,
      height: 30,
      borderRadius: 30,
      borderWidth: 2,
      borderColor: theme.colors.card,
      marginRight: 8,
    },
    space: {
      height: 60,
    },
  });

const Fandom = ({ fandom, press, styles, theme }: any) => (
  <TouchableOpacity
    style={styles.fandom}
    onPress={() => press(fandom.group_crazy_title, fandom.slug)}
  >
    <Text style={{ marginBottom: 6 }}>
      <Icon name="book" color={theme.colors.text} size={16} />{" "}
      <CustomText weight="500Medium" size={15}>
        {fandom.title}
      </CustomText>
    </Text>
    <CustomText>{fandom.sec_title}</CustomText>
  </TouchableOpacity>
);

const Request = ({ request, press, styles, theme }: any) => (
  <TouchableOpacity style={styles.request}>
    <CustomText weight="500Medium" mb={6} size={15}>
      {request.title}
    </CustomText>
    <Text>
      <Icon name="book" color={theme.colors.text} size={14} />{" "}
      {request.fandoms.map((fandom: any, id: any) => (
        <Text
          key={`${Math.random().toFixed(4)}_${fandom.group_crazy_title}`}
          style={{ color: theme.colors.text }}
        >
          <CustomText>{fandom.title}</CustomText>
          {id !== request.fandoms.length - 1 && ", "}
        </Text>
      ))}
    </Text>
  </TouchableOpacity>
);

const Fanfic = ({ fanfic, press, styles, theme }: any) => (
  <TouchableOpacity
    style={[
      styles.fanfic,
      // {
      //   borderColor:
      //     variables[theme.dark ? "dark_directions" : "directions"][
      //       directions[fanfic.direction]
      //     ],
      // },
    ]}
    onPress={() => press(fanfic.id)}
  >
    <Text style={{ marginBottom: 6 }}>
      {/* <Direction
        // name={sex[directions[fanfic.direction]]}
        // color={
        //   variables[theme.dark ? "dark_directions" : "directions"][
        //     directions[fanfic.direction]
        //   ]
        // }
        size={16}
      /> */}
      {"   "}
      <CustomText weight="500Medium" size={15}>
        {fanfic.title}
      </CustomText>
      {"       "}
      <CustomText weight="500Medium" size={15} color={colors.greenAccentHEX}>
        +{fanfic.marks_plus}
      </CustomText>
    </Text>
    <Text>
      <Icon name="user" color={theme.colors.text} size={14} />
      {"  "}
      <CustomText>{fanfic.author_nickname}</CustomText>
      {"   "}
      <CustomText>{fanfic.rating.title}</CustomText>
      {"   "}
    </Text>
    <Text>
      <Icon name="book" color={theme.colors.text} size={14} />
      {"  "}
      {fanfic.fandoms.map((fandom: any, id: any) => (
        <Text key={`${Math.random().toFixed(4)}_${fandom.group_crazy_title}`}>
          <CustomText>{fandom.title}</CustomText>
          {id !== fanfic.fandoms.length - 1 && ", "}
        </Text>
      ))}
    </Text>
  </TouchableOpacity>
);

const User = ({ user, press, styles, theme }: any) => (
  <TouchableOpacity style={styles.user} onPress={() => press(user.id)}>
    <Image style={styles.avatar} source={{ uri: user.avatar_path }} />
    <CustomText>{user.nickname}</CustomText>
  </TouchableOpacity>
);
