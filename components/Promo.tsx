import React, { useMemo } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CustomText from "./CustomText";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import { IPromo } from "../interfaces";
import { colors } from "../utils/colors";
import { sex, DirectionList } from "../utils/variables";
import { hexToRgb } from "../utils/functions";
import Direction from "./Direction";
import ImageBackgroundWithLoading from "./ImageBackgroundWithLoading";

interface CoversObject {
  femslash: string;
  het: string;
  gen: string;
  slash: string;
  mixed: string;
  other: string;
  article: string;
}

const covers = {
  femslash: "https://i.postimg.cc/Rhsh0nTJ/feather-femslash.png",
  het: "https://i.postimg.cc/7LFQps8f/feather-het.png",
  gen: "https://i.postimg.cc/QCb4KjBT/feather-gen.png",
  slash: "https://i.postimg.cc/SNd3Jf8v/feather-slash.png",
  mixed: "https://i.postimg.cc/YSh5cLvy/feather-mixed.png",
  other: "https://i.postimg.cc/mgdv6ygH/feather-other.png",
  article: "https://i.postimg.cc/mgdv6ygH/feather-other.png",
};

interface PromoProps {
  promo: IPromo;
  navigation: any;
}

export default function Promo({ promo, navigation }: PromoProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push("fanfic", {
          id: promo.id,
        })
      }
    >
      <ImageBackgroundWithLoading
        style={[
          styles.promo,
          {
            borderColor: colors.direction[promo.direction as DirectionList],
          },
        ]}
        uri={promo.cover || covers[promo.direction as keyof CoversObject]}
      >
        <View
          style={[
            styles.direction,
            {
              backgroundColor:
                colors.direction[promo.direction as DirectionList],
            },
          ]}
        >
          <Direction
            direction={promo.direction}
            color={theme.colors.background}
            size={18}
          />
        </View>
        <View style={styles.promo_footer}>
          <CustomText color={theme.colors.primary} mb={4} weight="600SemiBold">
            {promo.title}
          </CustomText>
          <CustomText
            color={theme.colors.primary}
            size={13}
            weight="400Regular_Italic"
            numberOfLines={2}
          >
            {promo.fandom}
          </CustomText>
        </View>
      </ImageBackgroundWithLoading>
    </TouchableOpacity>
  );
}

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    promo: {
      width: Dimensions.get("window").width / 2 - 24,
      height: 250,
      borderRadius: 6,
      overflow: "hidden",
      borderWidth: 3,
      marginBottom: 20,
      flexDirection: "column",
      justifyContent: "flex-end",
      backgroundColor: theme.colors.promo.background,
    },
    direction: {
      width: 40,
      height: 30,
      borderTopEndRadius: 10,
      borderBottomEndRadius: 10,
      position: "absolute",
      top: 20,
      left: 0,
      alignItems: "center",
      justifyContent: "center",
    },
    promo_footer: {
      width: "100%",
      padding: 5,
      backgroundColor: `rgba(${hexToRgb(theme.colors.text)},0.5)`,
    },
  });
