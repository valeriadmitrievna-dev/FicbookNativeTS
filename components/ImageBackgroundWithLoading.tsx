import { StyleSheet, ViewStyle, ImageBackground, View } from "react-native";
import React, { useMemo, useState } from "react";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import SmallLoader from "./SmallLoader";

interface ImageBackgroundWithLoadingProps {
  uri: string;
  style?: ViewStyle | ViewStyle[];
  children: React.ReactNode;
}

const ImageBackgroundWithLoading = ({
  uri,
  style,
  children,
}: ImageBackgroundWithLoadingProps) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [loaded, setLoaded] = useState<boolean>(false);

  const loadEnd = () => {
    setLoaded(true);
  };

  return (
    <View>
      <ImageBackground source={{ uri }} style={style} onLoadEnd={loadEnd}>
        {loaded ? children : <SmallLoader style={styles.loader} />}
      </ImageBackground>
    </View>
  );
};

export default React.memo(ImageBackgroundWithLoading);

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    loader: {
      marginVertical: 0,
      flex: 1,
      backgroundColor: theme.colors.card,
    },
  });
