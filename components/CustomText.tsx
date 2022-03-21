import React from "react";
import { useTheme } from "@react-navigation/native";
import { StyleProp, Text, TextStyle } from "react-native";

interface TextProps {
  size?: number;
  line?: number;
  color?: string;
  weight?: string;
  ml?: number;
  mr?: number;
  mb?: number;
  mt?: number;
  center?: boolean;
  capitalize?: boolean;
  textDecorationLine?: string;
  onPress?: (el: any) => void;
  italic?: boolean;
  width?: string | number;
  numberOfLines?: number;
}

const CustomText: React.FC<TextProps> = ({
  size = 15,
  line = size * 1.5,
  color,
  children = "",
  weight = "400Regular",
  ml = 0,
  mr = 0,
  mb = 0,
  mt = 0,
  center = false,
  capitalize = false,
  textDecorationLine = "none",
  onPress,
  italic = false,
  width = "auto",
  numberOfLines = 0
}) => {
  const theme = useTheme();

  return (
    <Text
      onPress={onPress}
      style={
        {
          fontFamily: `Montserrat_${weight}${italic ? "_Italic" : ""}`,
          color: color || theme.colors.text,
          fontSize: size,
          marginBottom: mb,
          marginTop: mt,
          marginLeft: ml,
          marginRight: mr,
          textAlign: center ? "center" : "left",
          textTransform: capitalize ? "capitalize" : "none",
          lineHeight: line,
          textDecorationLine,
          width,
          maxWidth: "100%",
        } as StyleProp<TextStyle>
      }
      numberOfLines={numberOfLines}
    >
      {/* {typeof children === "string"
        ? children
        : typeof children === "number"
        ? children.toString()
        : children?.join("")} */}
      {children}
    </Text>
  );
};

export default CustomText;
