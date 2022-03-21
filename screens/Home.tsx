import { StyleSheet, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
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

export default function Home() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [promos, setPromos] = useState<IPromo[]>([]);
  const [requests, setRequests] = useState<IRequest[]>([]);

  const getPromos = async () => {
    try {
      const { data } = await API.get("/");
      setPromos(data.promos);
      setRequests(data.requests);
    } catch (error: any) {
      console.log(error.message);
    }
    setLoaded(true);
  };

  useEffect(() => {
    getPromos();
  }, []);

  return (
    <PageContainer>
      <CustomText weight="700Bold" size={24} mb={16}>
        Ficbook
      </CustomText>
      {loaded && !!promos.length && !!requests.length ? (
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
            {promos.map(promo => (
              <Promo
                key={`${promo.title}_${promo.id}`}
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
          {requests.map(req => (
            <Request request={req} navigation={navigation} key={req.id} />
          ))}
          <View style={styles.space} />
        </>
      ) : (
        <ScreenLoader />
      )}
    </PageContainer>
  );
}

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
