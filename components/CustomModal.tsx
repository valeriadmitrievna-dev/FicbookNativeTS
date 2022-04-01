import {
  StyleSheet,
  Dimensions,
  Modal,
  View,
  Pressable,
  ViewStyle,
} from "react-native";
import React, { useMemo, useState } from "react";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import { hexToRgb } from "../utils/functions";
import Icon from "react-native-vector-icons/Ionicons";
import CustomText from "./CustomText";

interface CustomModalProps {
  visible: boolean;
  close: () => void;
  title?: string;
  header?: boolean;
  contentStyle?: ViewStyle;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  children,
  close,
  title,
  header = true,
  contentStyle,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [containerCode, setContainerCode] = useState<string>();

  const check = (e: any) => {
    const code = e.nativeEvent.target;
    if (code === containerCode) {
      close();
    }
  };

  const layout = ({ nativeEvent }: any) => {
    setContainerCode(nativeEvent.target);
  };

  return (
    <Modal visible={visible} transparent={true}>
      <Pressable style={styles.container} onPress={check} onLayout={layout}>
        <View style={[styles.content, contentStyle]}>
          {header && (
            <View style={styles.header}>
              <CustomText weight="600SemiBold" width="70%">
                {title || ""}
              </CustomText>
              <Pressable onPress={close}>
                <Icon name="close" size={18} />
              </Pressable>
            </View>
          )}
          {children}
        </View>
      </Pressable>
    </Modal>
  );
};

export default CustomModal;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: `rgba(${hexToRgb(theme.colors.background)}, 0.75)`,
    },
    content: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 18,
      borderRadius: 3,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3,
      elevation: 5,
      maxWidth: Dimensions.get("window").width - 30,
      minWidth: Dimensions.get("window").width * 0.75,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
  });
