import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import CustomText from "./CustomText";

interface TextArrayProps {
  array: any[];
  title: string;
  onPress?: (el: any) => void;
  underlined?: boolean;
}

const TextArray = ({ array, title, onPress, underlined }: TextArrayProps) => (
  <Text>
    {array.map((item, id: number) => (
      <>
        <CustomText
          key={`list_${id}`}
          onPress={() => !!onPress && onPress(item)}
          underlined={underlined}
        >
          {item[title] || item}
        </CustomText>
        {id !== (array?.length || 0) - 1 && <CustomText>, </CustomText>}
      </>
    ))}
  </Text>
);

export default TextArray;
