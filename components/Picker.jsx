import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useMemo, useState } from "react";
import CustomText from "./CustomText";
import { hexToRgb } from "../variables";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { disableScroll, enableScroll } from "../redux/root";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";

export default function Picker({
  mb = 0,
  mt = 0,
  value,
  onChange,
  items = [],
}) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [isOpened, setOpened] = useState(false);

  const open = () => {
    setOpened(true);
    dispatch(disableScroll());
  };
  const close = () => {
    setOpened(false);
    dispatch(enableScroll());
  };
  const handleChoose = v => {
    onChange(v);
    close();
  };

  return (
    <>
      <TouchableOpacity
        onPress={open}
        style={[
          styles.label,
          {
            marginBottom: mb,
            marginTop: mt,
          },
        ]}
      >
        <CustomText weight="500Medium">
          {items.find(i => i.value === value).label}
        </CustomText>
        <Icon size={14} name="chevron-down" />
      </TouchableOpacity>
      {isOpened && (
        <Pressable style={styles.body} onPress={close}>
          <ScrollView style={styles.bodyContainer}>
            {items.map((i, id) => (
              <TouchableOpacity
                onPress={() => handleChoose(i.value)}
                id={i.value + id}
                style={[
                  styles.item,
                  {
                    marginBottom: id === items.length - 1 ? 10 : 0,
                  },
                ]}
                key={`${i.value}_${i.label}_${id}`}
              >
                <CustomText>{i.label}</CustomText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Pressable>
      )}
    </>
  );
}

const createStyles = theme =>
  StyleSheet.create({
    body: {
      position: "absolute",
      zIndex: 5,
      top: 0,
      left: 0,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: `rgba(${hexToRgb(theme.colors.background)}, 0.75)`,
      width: "100%",
      height: Dimensions.get("window").height - 65,
    },
    bodyContainer: {
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      paddingVertical: 6,
      width: "75%",
      maxHeight: "70%",
      paddingBottom: 18,
    },
    item: {
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    label: {
      paddingVertical: 5,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.card,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  });
