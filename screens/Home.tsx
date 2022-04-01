import { RefreshControl, StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import PageContainer from "../components/PageContainer";
import {
  ExtendedTheme,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import CustomText from "../components/CustomText";
import SearchFandom from "../components/SearchFandom";
import API from "../api";
import { IPromo, IRequest } from "../interfaces";
import Promo from "../components/Promo";
import Ionicon from "react-native-vector-icons/Ionicons";
import Request from "../components/Request";
import { usePromise } from "../hooks/usePromise";
import SmallLoader from "../components/SmallLoader";

function Home() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [refreshControl, setRefreshControl] = React.useState<number>(0);
  const onRefresh = () => {
    setRefreshing(true);
    setRefreshControl(refreshControl + 1);
    setTimeout(() => setRefreshing(false), 400);
  };

  const getPromos = API.get("/").then(d => d.data);
  const [{ promos, requests }, error, pending] = usePromise(getPromos, {}, [
    refreshControl,
  ]);

  return (
    <PageContainer
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[theme.colors.card]}
          tintColor={theme.colors.card}
        />
      }
    >
      <CustomText weight="700Bold" size={24} mb={16}>
        Ficbook
      </CustomText>
      <SearchFandom navigation={navigation} />
      <View style={[styles.sectionTitle, { marginTop: 16 }]}>
        <Ionicon name="newspaper" size={18} color={theme.colors.text} />
        <CustomText weight="600SemiBold" size={18} ml={6}>
          Промо фанфиков
        </CustomText>
      </View>
      {pending ? (
        <SmallLoader />
      ) : (
        <View style={styles.promos}>
          {promos.map((promo: IPromo) => (
            <Promo
              key={`promo_${promo.id}`}
              promo={promo}
              navigation={navigation}
            />
          ))}
        </View>
      )}
      <View style={styles.sectionTitle}>
        <Ionicon name="flame" size={18} color={theme.colors.text} />
        <CustomText weight="600SemiBold" size={18} ml={6}>
          Горячие заявки
        </CustomText>
      </View>
      {pending ? (
        <SmallLoader />
      ) : (
        requests.map((req: IRequest) => (
          <Request
            request={req}
            navigation={navigation}
            key={`request_${req.id}`}
          />
        ))
      )}
      <View style={styles.space} />
    </PageContainer>
  );
}

export default React.memo(Home);

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    promos: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    sectionTitle: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 14,
    },
    space: {
      height: 20,
    },
  });
