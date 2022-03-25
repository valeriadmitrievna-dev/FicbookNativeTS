import { StyleSheet, View } from "react-native";
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
import ScreenLoader from "../components/ScreenLoader";
import { IPromo, IRequest } from "../interfaces";
import Promo from "../components/Promo";
import Ionicon from "react-native-vector-icons/Ionicons";
import Request from "../components/Request";
import { usePromise } from "../hooks/usePromise";

function Home() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation();

  const getPromos = API.get("/").then(d => d.data);
  const [{ promos, requests }, error, pending] = usePromise(getPromos, {}, []);

  return (
    <PageContainer>
      <CustomText weight="700Bold" size={24} mb={16}>
        Ficbook
      </CustomText>
      {!pending ? (
        <>
          <SearchFandom navigation={navigation} />
          <View style={[styles.sectionTitle, { marginTop: 16 }]}>
            <Ionicon name="newspaper" size={18} color={theme.colors.text} />
            <CustomText weight="600SemiBold" size={18}>
              {" "}
              Промо фанфиков
            </CustomText>
          </View>
          <View style={styles.promos}>
            {promos.map((promo: IPromo) => (
              <Promo
                key={`promo_${promo.id}`}
                promo={promo}
                navigation={navigation}
              />
            ))}
          </View>
          <View style={styles.sectionTitle}>
            <Ionicon name="flame" size={18} color={theme.colors.text} />
            <CustomText weight="600SemiBold" size={18}>
              {" "}
              Горячие заявки
            </CustomText>
          </View>
          {requests.map((req: IRequest) => (
            <Request request={req} navigation={navigation} key={`request_${req.id}`} />
          ))}
          <View style={styles.space} />
        </>
      ) : (
        <ScreenLoader />
      )}
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
