import { Alert, Linking } from "react-native";
import React, { useCallback } from "react";
import CustomText from "./CustomText";
import { colors } from "../utils/colors";
import { TextProps } from "../interfaces";

interface LinkProps extends TextProps {
  children: string;
}

const CustomLink = ({
  children,
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
    const supported = await Linking.canOpenURL(children);
    if (supported) {
      await Linking.openURL(children);
    } else {
      Alert.alert(`Don't know how to open this URL: ${children}`);
    }
  }, [children]);

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
      {children}
    </CustomText>
  );
};

export default CustomLink;
