import { StyleSheet, Text, View, Pressable, ViewStyle } from "react-native";
import React, { useMemo } from "react";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import CustomText from "./CustomText";
import Icon from "react-native-vector-icons/Feather";

interface NavigationProps {
  currentPage: number;
  pages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  isLoading?: boolean;
  style?: ViewStyle;
}

const Navigation = ({
  currentPage,
  pages,
  onNextPage,
  onPrevPage,
  isLoading = false,
  style,
}: NavigationProps) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={[styles.navigation, style]}>
      <Pressable
        style={[styles.navbutton, { opacity: currentPage <= 1 ? 0.5 : 1 }]}
        disabled={isLoading || currentPage <= 1}
        onPress={onPrevPage}
      >
        <Icon name="chevron-left" size={18} />
        <CustomText weight="500Medium">Назад</CustomText>
      </Pressable>
      <Text style={{ textDecorationLine: "underline" }}>
        <CustomText ml={8}>{currentPage}</CustomText>
        <CustomText> из </CustomText>
        <CustomText mr={8}>{pages}</CustomText>
      </Text>
      <Pressable
        style={[styles.navbutton, { opacity: currentPage === pages ? 0.5 : 1 }]}
        disabled={isLoading || currentPage === pages}
        onPress={onNextPage}
      >
        <CustomText weight="500Medium">Вперед</CustomText>
        <Icon name="chevron-right" size={18} />
      </Pressable>
    </View>
  );
};

export default React.memo(Navigation);

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    navigation: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    navbutton: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 4,
      backgroundColor: theme.colors.card,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: 120,
    },
  });
