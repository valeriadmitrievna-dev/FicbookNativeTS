import React, { useMemo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import CustomText from "./CustomText";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import { hexToRgb } from "../utils/functions";
import { IFandom } from "../interfaces";
import SuggestibleInput from "./SuggestibleInput";
import FandomToChoose from "./FandomToChoose";

export default function SearchFandom({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SuggestibleInput
      url="/search"
      placeholder="Поиск по фандому"
      item={(data: IFandom, id: number, array: any[]) => (
        <FandomToChoose
          fandom={data}
          style={{ borderBottomWidth: id + 1 === array.length ? 0 : 1 }}
          navigation={navigation}
        />
      )}
    />
  );
}

const createStyles = (theme: ExtendedTheme) => StyleSheet.create({});
