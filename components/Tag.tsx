import { StyleSheet, Pressable, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import CustomText from "./CustomText";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import { ITag, ITagInfo } from "../interfaces";
import { hexToRgb } from "../utils/functions";
import CustomModal from "./CustomModal";
import API from "../api";

interface TagProps {
  tag: ITag;
}

export default function Tag({ tag }: TagProps) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isTagAvailable, setTagAvailable] = useState<boolean>(false);
  const [tagInfo, setTagInfo] = useState<ITagInfo>();

  const openModal = () => {
    if (isTagAvailable) {
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const getTagInfo = async () => {
    try {
      const { data } = await API.get("/tag/" + tag.id);
      setTagInfo(data.tag);
      setTagAvailable(true);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTagInfo();
  }, []);

  return (
    <View>
      <CustomModal visible={modalVisible} title={tag.title} close={closeModal}>
        <CustomText mb={8}>{tagInfo?.description}</CustomText>
        {!!tagInfo?.synonyms && (
          <CustomText size={14} italic>
            Синонимы: {tagInfo?.synonyms}
          </CustomText>
        )}
      </CustomModal>
      <Pressable
        style={[
          styles.tag,
          {
            backgroundColor: tag.adult
              ? theme.colors.card
              : `rgba(${hexToRgb(theme.colors.card)}, 0.75)`,
          },
        ]}
        onPress={openModal}
      >
        <CustomText size={13} weight={tag.adult ? "600SemiBold" : "500Medium"}>
          {tag.title}
          {tag.adult ? " 18+" : ""}
        </CustomText>
      </Pressable>
    </View>
  );
}

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    tag: {
      marginRight: 5,
      marginBottom: 5,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 4,
      paddingTop: 2,
    },
  });
