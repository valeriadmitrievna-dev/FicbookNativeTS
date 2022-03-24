import { Alert, Linking } from "react-native";
import React, { useCallback } from "react";
import CustomText, { TextProps } from "./CustomText";
import { colors } from "../utils/colors";

interface LinkProps extends TextProps {
  url: string;
}

const CustomLink = ({
  url,
  size,
  line,
  weight,
  ml,
  mr,
  mb,
  mt,
  center,
  capitalize,
  underlined,
  width,
  numberOfLines,
}: LinkProps) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <CustomText
      size={size}
      line={line}
      color={colors.orangeAccentHEX}
      weight={weight}
      ml={ml}
      mr={mr}
      mb={mb}
      mt={mt}
      center={center}
      capitalize={capitalize}
      underlined={underlined}
      italic
      width={width}
      numberOfLines={numberOfLines}
      onPress={handlePress}
    >
      {url}
    </CustomText>
  );
};

export default CustomLink;
