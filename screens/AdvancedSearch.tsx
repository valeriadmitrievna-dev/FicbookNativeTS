import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ExtendedTheme,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import PageContainer from "../components/PageContainer";
import CustomText from "../components/CustomText";
import RadioGroup from "../components/RadioGroup";
import {
  fandom_filters,
  pages_filter,
  status_filter,
  size_filter,
  directions,
  ratings,
  directions_by_numbers,
  ratings_by_numbers,
  translate_filter,
  sorting_filter,
} from "../utils/variables";
import Input from "../components/Input";
import API from "../api";
import { IFandom, IFanfic, ITag } from "../interfaces";
import SmallLoader from "../components/SmallLoader";
import Navigation from "../components/Navigation";
import Fanfic from "../components/Fanfic";
import SuggestibleInput from "../components/SuggestibleInput";
import { hexToRgb } from "../utils/functions";
import Tag from "../components/Tag";
import FandomToChoose from "../components/FandomToChoose";

interface Selected {
  key: string | number;
  value: string | number;
}

export default function AdvancedSearch() {
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [fandomFilter, setFandomFilter] = useState<Selected>(
    fandom_filters.find(f => f.key === "any")
  );
  const [pagesFilter, setPagesFilter] = useState<Selected>(
    pages_filter.find(p => p.key === 1)
  );
  const [statusFilter, setStatusFilter] = useState<Selected[]>([]);
  const [sizeFilter, setSizeFilter] = useState<Selected[]>([]);
  const [direction, setDirection] = useState<Selected[]>([]);
  const [rating, setRating] = useState<Selected[]>([]);
  const [translateFilter, setTranslateFilter] = useState<Selected>(
    translate_filter.find(t => t.key === 1)
  );
  const [sortingFilter, setSortingFilter] = useState<Selected>(
    sorting_filter.find(s => s.key === 1)
  );
  const [pagesMin, setPagesMin] = useState<string>("");
  const [pagesMax, setPagesMax] = useState<string>("");
  const [likesMin, setLikesMin] = useState<string>("");
  const [likesMax, setLikesMax] = useState<string>("");
  const [rewards, setRewards] = useState<string>("");
  const [titleKeyword, setTitleKeyword] = useState<string>("");

  const toggling = (el: Selected, action: Function, array: Selected[]) => {
    if (array.includes(el)) {
      action([...array.filter(e => e !== el)]);
    } else {
      action([...array, el]);
    }
  };

  const _ratings = useRef<Selected[]>(
    Object.entries(ratings_by_numbers).map(([number, key]) => {
      return {
        key: number,
        value: ratings.find(d => d.key === key).value,
      };
    })
  );
  const _directions = useRef<Selected[]>(
    Object.entries(directions_by_numbers).map(([number, key]) => {
      return {
        key: number,
        value: directions.find(d => d.key === key).value,
      };
    })
  );

  const [fanfics, setFanfics] = useState<IFanfic[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pages, setPages] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);

  const [allowedFandoms, setAllowedFandoms] = useState<IFandom[]>([]);
  const [unallowedFandoms, setUnallowedFandoms] = useState<IFandom[]>([]);
  const [allowedTags, setAllowedTags] = useState<ITag[]>([]);
  const [unallowedTags, setUnallowedTags] = useState<ITag[]>([]);

  const addToArray = (el: any, action: Function, array: any[]) => {
    if (!array.includes(el)) action([...array, el]);
  };
  const deleteFromArray = (el: any, action: Function, array: any[]) => {
    if (array.includes(el)) action([...array.filter(i => i !== el)]);
  };

  const isMounted = useRef<boolean>(false);
  const submit = () => {
    setQuery(
      [
        `fandom_filter=${fandomFilter.key}`,
        allowedFandoms.map(f => `fandom_ids[]=${f.id}`).join("&"),
        unallowedFandoms.map(f => `fandom_exclude_ids[]=${f.id}`).join("&"),
        `pages_range=${pagesFilter.key}`,
        statusFilter.map(s => `statuses[]=${s.key}`).join("&"),
        sizeFilter.map(s => `sizes[]=${s.key}`).join("&"),
        direction.map(s => `directions[]=${s.key}`).join("&"),
        rating.map(s => `ratings[]=${s.key}`).join("&"),
        `transl=${translateFilter.key}`,
        `sort=${sortingFilter.key}`,
        `pages_min=${pagesMin}`,
        `pages_max=${pagesMax}`,
        allowedTags.map(t => `tags_include[]=${t.id}`).join("&"),
        unallowedTags.map(t => `tags_exclude[]=${t.id}`).join("&"),
        `likes_min=${likesMin}`,
        `likes_max=${likesMax}`,
        `rewards_min=${rewards}`,
        `title=${titleKeyword}`,
        "p=" + 1,
        "find=Найти!",
      ].join("&")
    );
    setCurrentPage(1);
  };

  const getResults = async () => {
    setLoading(true);
    try {
      const { data } = await API.post("/search/filters", { query });
      if (isMounted.current) {
        setFanfics(data.fanfics);
        setPages(data.pages);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    if (currentPage > 0) getResults();
  }, [currentPage, query]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <PageContainer>
      <CustomText size={18} weight="600SemiBold" mb={16}>
        Расширенный поиск
      </CustomText>
      {/* fanfom filter */}
      <>
        <RadioGroup
          data={fandom_filters}
          selected={fandomFilter}
          onChange={el => {
            setFandomFilter(el);
          }}
        />
        {fandomFilter.key === "fandom" && (
          <View style={styles.filter}>
            <CustomText weight="500Medium" mb={6}>
              Фэндомы
            </CustomText>
            {!!allowedFandoms.length &&
              allowedFandoms.map(f => (
                <FandomToChoose
                  fandom={f}
                  onPress={() =>
                    deleteFromArray(f, setAllowedFandoms, allowedFandoms)
                  }
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderBottomWidth: 0,
                    borderRadius: 2,
                    marginBottom: 6,
                  }}
                />
              ))}
            <SuggestibleInput
              url="/search"
              placeholder="Укажите фэндом"
              item={(data: IFandom) => (
                <FandomToChoose
                  fandom={data}
                  onPress={() =>
                    addToArray(data, setAllowedFandoms, allowedFandoms)
                  }
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderBottomWidth: 0,
                  }}
                />
              )}
              style={styles.input}
              dropdown={{
                // borderWidth: 1,
                borderRadius: 2,
                borderColor: theme.colors.text,
              }}
              maxHeight={300}
            />
            <CustomText weight="500Medium" mb={6} mt={16}>
              Исключить фэндомы
            </CustomText>
            {!!unallowedFandoms.length &&
              unallowedFandoms.map(f => (
                <FandomToChoose
                  fandom={f}
                  onPress={() =>
                    deleteFromArray(f, setUnallowedFandoms, unallowedFandoms)
                  }
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderBottomWidth: 0,
                    borderRadius: 2,
                    marginBottom: 6,
                  }}
                />
              ))}
            <SuggestibleInput
              url="/search"
              placeholder="Укажите фэндом"
              item={(data: IFandom) => (
                <FandomToChoose
                  fandom={data}
                  onPress={() =>
                    addToArray(data, setUnallowedFandoms, unallowedFandoms)
                  }
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderBottomWidth: 0,
                  }}
                />
              )}
              style={styles.input}
              dropdown={{
                // borderWidth: 1,
                borderRadius: 2,
                borderColor: theme.colors.text,
              }}
              maxHeight={300}
            />
          </View>
        )}
      </>
      <View style={styles.vspace} />
      {/* pages count filter */}
      <>
        <CustomText weight="500Medium" mb={6}>
          Количество страниц
        </CustomText>
        <RadioGroup
          data={pages_filter}
          selected={pagesFilter}
          onChange={el => {
            setPagesFilter(el);
          }}
        />
      </>
      {/* pages inputs */}
      {pagesFilter.key === 6 && (
        <>
          <View style={{ height: 6 }} />
          <View style={styles.row}>
            <View>
              <CustomText mb={4} size={14}>
                От
              </CustomText>
              <Input
                value={pagesMin}
                onChange={text => setPagesMin(text.replace(/[^0-9]/g, ""))}
                keyboardType="number-pad"
                style={[styles.input, { minWidth: 100 }]}
              />
            </View>
            <View style={styles.hspace} />
            <View>
              <CustomText mb={4} size={14}>
                до
              </CustomText>
              <Input
                value={pagesMax}
                onChange={text => setPagesMax(text.replace(/[^0-9]/g, ""))}
                keyboardType="number-pad"
                style={[styles.input, { minWidth: 100 }]}
              />
            </View>
          </View>
        </>
      )}
      <View style={styles.vspace} />
      {/* status filter */}
      <>
        <CustomText weight="500Medium" mb={6}>
          Со статусом
        </CustomText>
        <RadioGroup
          data={status_filter}
          selected={statusFilter}
          onChange={el => {
            toggling(el, setStatusFilter, statusFilter);
          }}
        />
      </>
      <View style={styles.vspace} />
      {/* size filter */}
      {statusFilter.includes(status_filter.find(s => s.key === 1)) && (
        <>
          <CustomText weight="500Medium" mb={6}>
            Планируемый размер
          </CustomText>
          <RadioGroup
            data={size_filter}
            selected={sizeFilter}
            onChange={el => {
              toggling(el, setSizeFilter, sizeFilter);
            }}
          />
          <View style={styles.vspace} />
        </>
      )}
      {/* rating filter */}
      <>
        <CustomText weight="500Medium" mb={6}>
          C одним из рейтингов
        </CustomText>
        <RadioGroup
          data={_ratings.current}
          selected={rating}
          onChange={el => {
            toggling(el, setRating, rating);
          }}
        />
      </>
      <View style={styles.vspace} />
      {/* translation filter */}
      <>
        <CustomText weight="500Medium" mb={6}>
          Перевод или оригинальный текст
        </CustomText>
        <RadioGroup
          data={translate_filter}
          selected={translateFilter}
          onChange={el => {
            setTranslateFilter(el);
          }}
        />
      </>
      <View style={styles.vspace} />
      {/* direction filter */}
      <>
        <CustomText weight="500Medium" mb={6}>
          Одной из направленностей
        </CustomText>
        <RadioGroup
          data={_directions.current}
          selected={direction}
          onChange={el => {
            toggling(el, setDirection, direction);
          }}
        />
      </>
      <View style={styles.vspace} />
      {/* allowed tags list */}
      <>
        <CustomText weight="500Medium" mb={6}>
          Включить метки
        </CustomText>
        {!!allowedTags.length && (
          <View style={styles.tags}>
            {allowedTags.map(tag => (
              <Tag
                tag={tag}
                onPress={() =>
                  deleteFromArray(tag, setAllowedTags, allowedTags)
                }
              />
            ))}
          </View>
        )}
        <SuggestibleInput
          url="/tags/search"
          placeholder="Начните вводить или выберите..."
          item={(data: ITag, id: number, array: any[]) => {
            return (
              <Pressable
                style={styles.tag}
                onPress={() => addToArray(data, setAllowedTags, allowedTags)}
              >
                <View style={[styles.row, { marginBottom: 6 }]}>
                  <Tag tag={data} style={{ marginBottom: 0 }} />
                  <Text>
                    <CustomText size={14}> x </CustomText>
                    <CustomText size={14}>{data.usage}</CustomText>
                  </Text>
                </View>
                <CustomText size={14} italic>
                  {data.description}
                </CustomText>
              </Pressable>
            );
          }}
          style={styles.input}
          dropdown={{
            // borderWidth: 1,
            borderRadius: 2,
            borderColor: theme.colors.text,
          }}
        />
      </>
      <View style={styles.vspace} />
      {/* unallowed tags list */}
      <>
        <CustomText weight="500Medium" mb={6}>
          Исключить метки
        </CustomText>
        {!!unallowedTags.length && (
          <View style={styles.tags}>
            {unallowedTags.map(tag => (
              <Tag
                tag={tag}
                onPress={() =>
                  deleteFromArray(tag, setUnallowedTags, unallowedTags)
                }
              />
            ))}
          </View>
        )}
        <SuggestibleInput
          url="/tags/search"
          placeholder="Начните вводить или выберите..."
          item={(data: ITag, id: number, array: any[]) => {
            return (
              <Pressable
                style={styles.tag}
                onPress={() =>
                  addToArray(data, setUnallowedTags, unallowedTags)
                }
              >
                <View style={[styles.row, { marginBottom: 6 }]}>
                  <Tag tag={data} style={{ marginBottom: 0 }} />
                  <Text>
                    <CustomText size={14}> x </CustomText>
                    <CustomText size={14}>{data.usage}</CustomText>
                  </Text>
                </View>
                <CustomText size={14} italic>
                  {data.description}
                </CustomText>
              </Pressable>
            );
          }}
          style={styles.input}
          dropdown={{
            // borderWidth: 1,
            borderRadius: 2,
            borderColor: theme.colors.text,
          }}
        />
      </>
      {/* likes count */}
      <View style={styles.vspace} />
      <>
        <CustomText weight="500Medium" mb={6}>
          Количество оценок
        </CustomText>
        <CustomText mb={4} size={14}>
          От
        </CustomText>
        <Input
          value={likesMin}
          onChange={text => setLikesMin(text.replace(/[^0-9]/g, ""))}
          keyboardType="number-pad"
          style={[styles.input, { minWidth: 100 }]}
        />
        <CustomText mb={4} mt={6} size={14}>
          до
        </CustomText>
        <Input
          value={likesMax}
          onChange={text => setLikesMax(text.replace(/[^0-9]/g, ""))}
          keyboardType="number-pad"
          style={[styles.input, { minWidth: 100 }]}
        />
      </>
      {/* rewards count */}
      <View style={styles.vspace} />
      <>
        <CustomText weight="500Medium" mb={6}>
          Количество наград
        </CustomText>
        <CustomText mb={4} size={14}>
          От
        </CustomText>
        <Input
          value={rewards}
          onChange={text => setRewards(text.replace(/[^0-9]/g, ""))}
          keyboardType="number-pad"
          style={[styles.input, { minWidth: 100 }]}
        />
      </>
      {/* title keywords */}
      <View style={styles.vspace} />
      <>
        <CustomText weight="500Medium" mb={6}>
          В названии которого есть слова
        </CustomText>
        <Input
          value={titleKeyword}
          onChange={setTitleKeyword}
          style={[styles.input, { minWidth: 100 }]}
        />
      </>
      <View style={styles.vspace} />
      {/* sorting filter */}
      <>
        <CustomText weight="500Medium" mb={6}>
          Отсортировать результат
        </CustomText>
        <RadioGroup
          data={sorting_filter}
          selected={sortingFilter}
          onChange={el => {
            setSortingFilter(el);
          }}
        />
      </>

      {loading ? (
        <SmallLoader style={{ marginBottom: 64 }} />
      ) : (
        <Pressable style={styles.submit} onPress={submit}>
          <CustomText weight="500Medium" center>
            Найти
          </CustomText>
        </Pressable>
      )}

      {!loading &&
        currentPage > 0 &&
        (!!fanfics.length ? (
          <View>
            {pages > 1 && (
              <Navigation
                currentPage={currentPage}
                pages={pages}
                onNextPage={nextPage}
                onPrevPage={prevPage}
                style={{ marginBottom: 24 }}
              />
            )}
            {fanfics.map(f => (
              <Fanfic fanfic={f} navigation={navigation} />
            ))}
            {pages > 1 && (
              <Navigation
                currentPage={currentPage}
                pages={pages}
                onNextPage={nextPage}
                onPrevPage={prevPage}
                style={{ marginBottom: 72, marginTop: 24 }}
              />
            )}
          </View>
        ) : (
          <>
            <Image
              source={{ uri: "https://i.postimg.cc/pTNCCQJT/error404.png" }}
              style={{
                width: Dimensions.get("window").width * 0.6,
                height: Dimensions.get("window").width * 0.6,
                alignSelf: "center",
                marginBottom: 24,
              }}
            />
            <CustomText center weight="600SemiBold" mb={72}>
              Не удалось найти ничего с указанными вами параметрами.
            </CustomText>
          </>
        ))}
    </PageContainer>
  );
}

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    vspace: {
      height: 16,
    },
    hspace: {
      width: 16,
    },
    submit: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderWidth: 2,
      borderColor: theme.colors.text,
      marginTop: 24,
      marginBottom: 36,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    input: {
      borderWidth: 1,
      borderRadius: 2,
      paddingVertical: 2,
      paddingHorizontal: 10,
    },
    tag: {
      paddingVertical: 8,
      paddingHorizontal: 10,
    },
    tags: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      marginBottom: 6,
    },
    filter: {
      backgroundColor: `rgba(${hexToRgb(theme.colors.card)}, 0.5)`,
      borderLeftWidth: 4,
      borderLeftColor: `rgba(${hexToRgb(theme.colors.card)}, 0.75)`,
      paddingVertical: 8,
      paddingHorizontal: 10,
      marginTop: 6,
    },
  });
