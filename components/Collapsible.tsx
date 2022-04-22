import {
  ColorValue,
  StyleSheet,
  Pressable,
  View,
  ViewStyle,
} from "react-native";
import React, {
  useEffect,
  useMemo,
} from "react";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import CustomText from "./CustomText";
import Icon from "react-native-vector-icons/FontAwesome5";
import { hexToRgb } from "../utils/functions";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface CollapsibleProps {
  opened: boolean;
  open: (id: string) => void;
  title: string;
  icon?: string;
  color?: ColorValue;
  headerStyle?: ViewStyle;
  bodyStyle?: ViewStyle;
  style?: ViewStyle;
  children: React.ReactNode;
  id: string;
}

const Collapsible = ({
  opened,
  open,
  title,
  icon,
  color,
  headerStyle,
  bodyStyle,
  style,
  children,
  id,
}: CollapsibleProps) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const height = useSharedValue(0);
  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };
  const animatedStyles = useAnimatedStyle(() => {
    return {
      maxHeight: withTiming(height.value, config),
      overflow: "hidden",
    };
  });

  useEffect(() => {
    if (opened) height.value = 10000;
    else height.value = 0;
  }, [opened]);

  return (
    <View style={style}>
      <Pressable style={[styles.header, headerStyle]} onPress={() => open(id)}>
        {!!icon && (
          <Icon
            name={icon}
            color={color || theme.colors.text}
            size={18}
            style={styles.icon}
          />
        )}
        <CustomText weight="600SemiBold">{title}</CustomText>
        <Icon
          name="chevron-down"
          color={color || theme.colors.text}
          size={18}
          style={styles.chevron}
        />
      </Pressable>
      <Animated.View
        style={[
          styles.body,
          bodyStyle,
          animatedStyles
        ]}
      >
        {children}
      </Animated.View>
    </View>
  );
};

export default React.memo(Collapsible);

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 6,
      paddingHorizontal: 8,
      backgroundColor: theme.colors.card,
    },
    icon: {
      marginRight: 6,
      width: 20
    },
    chevron: {
      marginLeft: "auto",
    },
    body: {
      paddingVertical: 6,
      paddingHorizontal: 8,
      backgroundColor: `rgba(${hexToRgb(theme.colors.card)}, 0.75)`,
    },
  });
