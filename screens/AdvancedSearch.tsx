import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import PageContainer from "../components/PageContainer";
import CustomText from "../components/CustomText";

export default function AdvancedSearch() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <PageContainer>
      <CustomText size={18} weight="600SemiBold" mb={16}>
        Расширенный поиск
      </CustomText>
    </PageContainer>
  );
}

const createStyles = (theme: ExtendedTheme) => StyleSheet.create({});
