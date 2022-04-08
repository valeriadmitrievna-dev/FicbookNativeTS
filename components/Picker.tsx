import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import CustomModal from "./CustomModal";
import CustomText from "./CustomText";
import { hexToRgb } from "../utils/functions";

type Key = string | number;
type Value = string | number;
interface PickerProps {
  data: {
    key: Key;
    value: Value;
  }[];
  selectedValue: Value;
  onValueChange: (value: Value) => void;
  style?: ViewStyle;
}

const Picker = ({ data, selectedValue, onValueChange, style }: PickerProps) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [isOpened, setOpened] = useState<boolean>(false);

  const openPicker = () => {
    setOpened(true);
  };

  const closePicker = () => {
    setOpened(false);
  };

  const choose = (item: { key: Key; value: Value }) => {
    onValueChange(item.key);
    closePicker()
  };

  return (
    <>
      <CustomModal
        visible={isOpened}
        header={false}
        close={closePicker}
        contentStyle={styles.content}
      >
        {data.map((d, id) => (
          <Pressable
            key={d.key}
            style={[
              styles.item,
              {
                borderBottomWidth: id === data.length - 1 ? 0 : 1,
              },
            ]}
            onPress={() => choose(d)}
          >
            <CustomText>{d.value}</CustomText>
          </Pressable>
        ))}
      </CustomModal>
      <Pressable style={[styles.picker, style]} onPress={openPicker}>
        <CustomText>{data.find(d => d.key === selectedValue).value}</CustomText>
        <CustomText size={24} line={24} mb={-6}>
          &#9662;
        </CustomText>
      </Pressable>
    </>
  );
};

export default React.memo(Picker);

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    picker: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 2,
      backgroundColor: theme.colors.card,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    content: {
      paddingVertical: 0,
      paddingHorizontal: 0,
    },
    item: {
      paddingVertical: 12,
      paddingHorizontal: 18,
      borderBottomWidth: 1,
      borderBottomColor: `rgba(${hexToRgb(theme.colors.text)}, 0.1)`,
    },
  });
