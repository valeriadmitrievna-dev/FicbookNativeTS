import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LayoutChangeEvent,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import {
  ExtendedTheme,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import PageContainer from "../components/PageContainer";
import CustomText from "../components/CustomText";
import BackButton from "../components/BackButton";
import API from "../api";
import {
  IAuthor,
  IFandom,
  IFanfic,
  IFicContent,
  IPairing,
  IPart,
  ScrollToObject,
} from "../interfaces";
import ScreenLoader from "../components/ScreenLoader";
import FicAuthor from "../components/FicAuthor";
import Icon from "react-native-vector-icons/Feather";
import Ionicon from "react-native-vector-icons/Ionicons";
import CustomLink from "../components/CustomLink";
import Tags from "../components/Tags";
import { colors } from "../utils/colors";
import { hexToRgb } from "../utils/functions";
import SmallLoader from "../components/SmallLoader";
import { usePromise } from "../hooks/usePromise";
import { DirectionList, RatingList, StatusList } from "../utils/variables";
import TextArray from "../components/TextArray";

interface FanficProps {
  route: any;
}

function Fanfic({ route }: FanficProps) {
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const id: string = route?.params?.id;
  const part: string | undefined = route?.params?.part;

  const [activePart, setActivePart] = useState<string | undefined>(part);
  const [scrollTo, setScrollTo] = useState<ScrollToObject>();

  const getFanfic = API.get(`/readfic/${id}/${activePart || ""}`).then(
    d => d.data
  );
  const [{ fanfic, parts, content }, error, pending] = usePromise(
    getFanfic,
    {
      fanfic: undefined,
      parts: [],
    },
    [activePart]
  );

  const getLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    setScrollTo({
      y: nativeEvent.layout.y,
      loaded: !pending,
    });
  };

  const toMenu = () => {
    setActivePart(undefined);
  };

  const getFandom = (fandom: IFandom) => {
    navigation.push("fandom", { fandom });
  };

  useEffect(() => {
    if (!id) {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate("main");
      }
    }
  }, []);

  if (!!error) {
    console.log(error);
  }

  return (
    <PageContainer
      fullHeight
      scrollTo={scrollTo}
      scrollBottom={!!fanfic && pending}
    >
      {!!fanfic ? (
        <View>
          <View>
            <View style={styles.header}>
              <View style={styles.authors}>
                {fanfic.authors.map((a: IAuthor) => (
                  <FicAuthor author={a} key={`author_${a.id}`} />
                ))}
              </View>
              <BackButton round />
            </View>
            <View style={styles.badges}>
              <View
                style={[
                  styles.badge,
                  {
                    borderBottomLeftRadius: 0,
                    backgroundColor:
                      colors.direction[fanfic.direction.value as DirectionList],
                  },
                ]}
              >
                <CustomText
                  weight="500Medium"
                  size={13}
                  color={theme.colors.primary}
                >
                  {fanfic.direction.title}
                </CustomText>
              </View>
              {!!fanfic.translated && (
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor: colors.blueHEX,
                      paddingTop: 3,
                    },
                  ]}
                >
                  <Icon name="globe" size={14} color={theme.colors.primary} />
                </View>
              )}
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor:
                      colors.rating[fanfic.rating.value as RatingList],
                  },
                ]}
              >
                <CustomText
                  size={13}
                  weight="500Medium"
                  color={theme.colors.primary}
                >
                  {fanfic.rating.value}
                </CustomText>
              </View>
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor:
                      colors.status[fanfic.status.value as StatusList],
                  },
                ]}
              >
                <CustomText
                  size={13}
                  weight="500Medium"
                  color={colors.statusesText[fanfic.status.value as StatusList]}
                >
                  {fanfic.status.title}
                </CustomText>
              </View>
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: colors.greenAccentHEX,
                  },
                ]}
              >
                <Icon name="thumbs-up" size={12} color={theme.colors.primary} />
                <CustomText
                  size={13}
                  weight="500Medium"
                  color={theme.colors.primary}
                  ml={4}
                >
                  {fanfic.likes.title}
                </CustomText>
              </View>
              {!!fanfic.rewards.value && (
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor: colors.yellowAccentHEX,
                    },
                  ]}
                >
                  <Ionicon
                    name="trophy"
                    size={12}
                    color={theme.colors.primary}
                  />
                  <CustomText
                    size={13}
                    weight="500Medium"
                    color={theme.colors.primary}
                    ml={4}
                  >
                    {fanfic.rewards.value}
                  </CustomText>
                </View>
              )}
            </View>
            <CustomText weight="600SemiBold" size={22} mb={6}>
              {fanfic.title}
            </CustomText>
            {fanfic.fandoms.map((f: IFandom) => (
              <Text
                key={`fandom_${f.group}_${f.slug}`}
                style={{ marginBottom: 4 }}
              >
                <Icon name="book" size={16} />{" "}
                <CustomText underlined onPress={() => getFandom(f)}>
                  {f.title}
                </CustomText>
              </Text>
            ))}
            {!!fanfic.away && (
              <Text style={{ marginTop: 14 }}>
                <CustomText weight="500Medium">????????????????: </CustomText>
                <CustomLink>{fanfic.away}</CustomLink>
              </Text>
            )}
            {!!fanfic.pairings?.length && (
              <Text style={{ marginTop: 18 }}>
                <CustomText weight="500Medium">?????????????? ?? ??????????????????:</CustomText>{" "}
                <TextArray array={fanfic.pairings} title="title" />
              </Text>
            )}
            <Text style={{ marginTop: 6 }}>
              <CustomText weight="500Medium">????????????: </CustomText>
              <CustomText>{fanfic.size}</CustomText>
            </Text>
            <Tags style={styles.tags} tags={fanfic.tags} />
            <CustomText weight="500Medium" mt={8} mb={4}>
              ????????????????:
            </CustomText>
            <CustomText>{fanfic.description}</CustomText>
            {!!fanfic.comment && (
              <>
                <CustomText weight="500Medium" mt={14} mb={4}>
                  ????????????????????:
                </CustomText>
                <CustomText>{fanfic.comment}</CustomText>
              </>
            )}
            {!!fanfic.for && (
              <>
                <CustomText weight="500Medium" mt={14} mb={4}>
                  ????????????????????:
                </CustomText>
                <CustomText>{fanfic.for}</CustomText>
              </>
            )}
            {!!fanfic.request && (
              <Text style={{ marginTop: 12 }}>
                <CustomText weight="500Medium" mt={14} mb={4}>
                  ???????????? ???????????????? ???? ????????????:
                </CustomText>{" "}
                <CustomText underlined>{fanfic.request.title}</CustomText>
              </Text>
            )}
          </View>
          {pending && <SmallLoader style={styles.loader} />}
          {!pending && !activePart && !!parts?.length && (
            <View style={styles.parts}>
              <CustomText mb={14} center size={18} weight="600SemiBold">
                ????????????????????
              </CustomText>
              {parts.map((p: IPart) => (
                <TouchableOpacity
                  key={`${fanfic.id}_part_${p.id}`}
                  style={styles.part}
                  onPress={() => setActivePart(p.id)}
                >
                  <CustomText
                    weight="500Medium"
                    size={17}
                    width="90%"
                    mb={3}
                    line={20}
                  >
                    {p.title}
                  </CustomText>
                  <CustomText size={14}>{p.info}</CustomText>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {!pending && !!content?.content && (
            <View onLayout={getLayout}>
              {!!content.navigation && (
                <View style={[styles.navigation, { marginTop: 32 }]}>
                  {!!content.navigation.prev && (
                    <TouchableOpacity
                      style={[styles.navbutton, { marginRight: 6 }]}
                      onPress={() => setActivePart(content.navigation.prev)}
                    >
                      <Icon name="chevron-left" size={24} />
                      <CustomText weight="500Medium">??????????</CustomText>
                    </TouchableOpacity>
                  )}
                  {!!content.navigation.main && (
                    <TouchableOpacity
                      style={[styles.navbutton, { flexGrow: 0 }]}
                      onPress={toMenu}
                    >
                      <Icon name="list" size={24} />
                    </TouchableOpacity>
                  )}
                  {!!content.navigation.next && (
                    <TouchableOpacity
                      style={[
                        styles.navbutton,
                        { marginLeft: 6, justifyContent: "flex-end" },
                      ]}
                      onPress={() => setActivePart(content.navigation.next)}
                    >
                      <CustomText weight="500Medium">????????????</CustomText>
                      <Icon name="chevron-right" size={24} />
                    </TouchableOpacity>
                  )}
                </View>
              )}
              <View style={styles.content}>
                <CustomText mb={4} center size={18} weight="600SemiBold">
                  {content.title}
                </CustomText>
                <CustomText mb={14} center>
                  {content.info}
                </CustomText>
                {!!content.comment_top && (
                  <>
                    <CustomText mb={14}>{content.comment_top}</CustomText>
                    <View style={[styles.line]} />
                  </>
                )}
                <CustomText mt={24} mb={24}>
                  {content.content}
                </CustomText>
                {!!content.comment_bottom && (
                  <>
                    <View style={[styles.line]} />
                    <CustomText mb={14} mt={14}>
                      {content.comment_bottom}
                    </CustomText>
                  </>
                )}
              </View>
              {!!content.navigation && (
                <View
                  style={[
                    styles.navigation,
                    { marginTop: 24, marginBottom: 72 },
                  ]}
                >
                  {!!content.navigation.prev && (
                    <TouchableOpacity
                      style={[styles.navbutton, { marginRight: 6 }]}
                      onPress={() => setActivePart(content.navigation.prev)}
                    >
                      <Icon name="chevron-left" size={24} />
                      <CustomText weight="500Medium">??????????</CustomText>
                    </TouchableOpacity>
                  )}
                  {!!content.navigation.main && (
                    <TouchableOpacity
                      style={[styles.navbutton, { flexGrow: 0 }]}
                      onPress={toMenu}
                    >
                      <Icon name="list" size={24} />
                    </TouchableOpacity>
                  )}
                  {!!content.navigation.next && (
                    <TouchableOpacity
                      style={[
                        styles.navbutton,
                        { marginLeft: 6, justifyContent: "flex-end" },
                      ]}
                      onPress={() => setActivePart(content.navigation.next)}
                    >
                      <CustomText weight="500Medium">????????????</CustomText>
                      <Icon name="chevron-right" size={24} />
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          )}
        </View>
      ) : (
        <ScreenLoader />
      )}
    </PageContainer>
  );
}

export default React.memo(Fanfic);

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 24,
    },
    authors: {
      flexDirection: "row",
      width: "85%",
      flexWrap: "wrap",
    },
    tags: {
      marginTop: 10,
    },
    badges: {
      flexDirection: "row",
      alignItems: "stretch",
      flexWrap: "wrap",
      marginBottom: 10,
    },
    badge: {
      paddingHorizontal: 6,
      paddingTop: 1,
      paddingBottom: 3,
      borderRadius: 3,
      backgroundColor: theme.colors.card,
      marginRight: 4,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 4,
    },
    parts: {
      marginTop: 22,
      marginBottom: 24,
    },
    part: {
      backgroundColor: `rgba(${hexToRgb(theme.colors.card)}, 0.5)`,
      paddingVertical: 6,
      paddingHorizontal: 10,
      marginBottom: 8,
      borderRadius: 4,
    },
    content: {
      marginTop: 24,
      marginBottom: 6,
    },
    line: {
      height: 2,
      backgroundColor: `rgba(${hexToRgb(theme.colors.border)}, 0.5)`,
    },
    navigation: {
      flexDirection: "row",
      alignItems: "stretch",
    },
    navbutton: {
      paddingVertical: 6,
      paddingHorizontal: 8,
      borderRadius: 4,
      flexGrow: 1,
      backgroundColor: theme.colors.card,
      flexDirection: "row",
      alignItems: "center",
    },
    loader: {
      marginTop: 48,
      marginBottom: 64,
    },
  });
