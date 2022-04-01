import React from "react";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MIcon from "react-native-vector-icons/MaterialIcons";
import { DirectionList } from "../utils/variables";

interface DirectionProps {
  direction: DirectionList;
  color: string;
  size: number;
}

export default function Direction({ direction, color, size }: DirectionProps) {

  if (direction === "het") {
    return <FAIcon name="venus-mars" color={color} size={size} />;
  }
  if (direction === "gen") {
    return <MCIcon name="sword" color={color} size={size} />;
  }
  if (direction === "femslash") {
    return <FAIcon name="venus-double" color={color} size={size} />;
  }
  if (direction === "slash") {
    return <FAIcon name="mars-double" color={color} size={size} />;
  }
  if (direction === "mixed") {
    return <MCIcon name="gender-transgender" color={color} size={size} />;
  }
  if (direction === "other") {
    return <FAIcon name="circle-notch" color={color} size={size} />;
  }
  if (direction === "article") {
    return <MIcon name="article" color={color} size={size} />;
  }
  return <FAIcon name="xmark" color={color} size={size} />
}

