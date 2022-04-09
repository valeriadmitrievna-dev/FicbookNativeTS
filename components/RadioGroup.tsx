import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import React, { useMemo } from "react";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import CustomText from "./CustomText";

interface RadioObject {
  key: string | number;
  value: string | number;
}

interface RadioGroupProps {
  data: RadioObject[];
  selected: RadioObject | RadioObject[];
  onChange: (el: RadioObject) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export default function RadioGroup({
  data,
  selected,
  onChange,
  disabled,
  style,
}: RadioGroupProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={style}>
      {data.map((el: RadioObject, id: number) => (
        <Pressable
          style={[
            styles.row,
            {
              marginBottom: id === data.length - 1 ? 0 : 4,
              opacity: disabled ? 0.75 : 1,
            },
          ]}
          onPress={() => {
            if (!disabled) onChange(el);
          }}
        >
          <Icon
            name={
              Array.isArray(selected)
                ? selected.includes(el)
                  ? "checkbox-outline"
                  : "square-outline"
                : el === selected
                ? "radio-button-on"
                : "radio-button-off"
            }
            color={theme.colors.text}
            size={16}
          />
          <CustomText ml={6}>{el.value}</CustomText>
        </Pressable>
      ))}
    </View>
  );
}

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
  });
