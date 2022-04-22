import { StyleSheet, Pressable, View, Text, ViewStyle } from "react-native";
import React, { useMemo, useState } from "react";
import CustomText from "./CustomText";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import { ITag } from "../interfaces";
import { hexToRgb } from "../utils/functions";
import CustomModal from "./CustomModal";
import API from "../api";
import { usePromise } from "../hooks/usePromise";
import SmallLoader from "./SmallLoader";

interface TagProps {
  tag: ITag;
  onPress?: (tag: ITag) => void;
  style?: ViewStyle;
  size?: number
}

const Tag = ({ tag, onPress, style, size = 13 }: TagProps) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const getTagInfo = API.get("/tag/" + tag.id).then(d => d.data);
  const [{ tag: tagInfo }, error, pending] = usePromise(getTagInfo, {}, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <CustomModal visible={modalVisible} title={tag.title} close={closeModal}>
        {pending ? (
          <SmallLoader />
        ) : (
          <>
            <CustomText mb={8}>{tagInfo?.description}</CustomText>
            {!!tagInfo?.synonyms && (
              <Text>
                <CustomText size={14} italic>
                  Синонимы:
                </CustomText>{" "}
                <CustomText size={14} italic>
                  {tagInfo?.synonyms}
                </CustomText>
              </Text>
            )}
          </>
        )}
      </CustomModal>
      <Pressable
        onPress={() => {
          if (onPress) onPress(tag);
          else openModal();
        }}
        style={[
          styles.tag,
          {
            backgroundColor: tag.adult
              ? theme.colors.card
              : `rgba(${hexToRgb(theme.colors.card)}, 0.75)`,
          },
          style
        ]}
      >
        <CustomText size={size} weight={tag.adult ? "600SemiBold" : "500Medium"}>
          {`${tag.title} ${tag.adult ? " 18+" : ""}`}
        </CustomText>
      </Pressable>
    </View>
  );
};

export default React.memo(Tag);

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    tag: {
      marginRight: 5,
      marginBottom: 5,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 4,
      paddingTop: 2,
      position: "relative",
    },
  });
