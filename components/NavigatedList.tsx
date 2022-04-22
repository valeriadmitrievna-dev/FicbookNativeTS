import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useMemo } from "react";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import Navigation from "./Navigation";
import SmallLoader from "./SmallLoader";

type Item = any;

interface NavigatedListProps {
  currentPage: number;
  pages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  isLoading?: boolean;
  data: Item[];
  renderItem: (item: Item, id: number, array: Item[]) => JSX.Element;
  navStyle?: ViewStyle;
  listStyle?: ViewStyle;
}

export default function NavigatedList({
  currentPage,
  pages,
  onNextPage,
  onPrevPage,
  isLoading = false,
  data,
  renderItem,
  navStyle,
  listStyle,
}: NavigatedListProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={listStyle}>
      <Navigation
        currentPage={currentPage}
        pages={pages}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
        isLoading={isLoading}
        style={{ marginBottom: 24 }}
      />
      {isLoading ? <SmallLoader /> : data.map(renderItem)}
      <Navigation
        currentPage={currentPage}
        pages={pages}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
        isLoading={isLoading}
        style={{ marginTop: 8, marginBottom: 64 }}
      />
    </View>
  );
}

const createStyles = (theme: ExtendedTheme) => StyleSheet.create({});
