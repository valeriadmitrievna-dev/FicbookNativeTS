import React, { ReactElement, useEffect, useMemo, useRef } from "react";
import {
  ScrollView,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
  Dimensions,
  NativeModules,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ExtendedTheme, useTheme } from "@react-navigation/native";
import { hexToRgb } from "../utils/functions";
import { ScrollToObject } from "../interfaces";

interface PageContainerProps {
  backgroundColor?: string;
  fullHeight?: boolean;
  scrollTo?: ScrollToObject;
  scrollBottom?: boolean;
  refreshControl?: ReactElement;
  ref?: React.MutableRefObject<ScrollView>;
}

const PageContainer: React.FC<PageContainerProps> = ({
  backgroundColor,
  children,
  fullHeight,
  scrollTo,
  scrollBottom,
  refreshControl,
  ref,
  // sticky = [],
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const scrollRef = ref || useRef<ScrollView>(null);
  const CONTENT_OFFSET_THRESHOLD = 200;

  const AnimatedTouchable = Animated.createAnimatedComponent(Pressable);
  const opacity = useSharedValue(0);
  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };
  const style = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, config),
    };
  });

  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const handleScroll = (event: any) => {
    if (event.nativeEvent.contentOffset.y > CONTENT_OFFSET_THRESHOLD) {
      opacity.value = 1;
    } else {
      opacity.value = 0;
    }
  };

  useEffect(() => {
    if (!!scrollTo?.y && !!scrollTo?.loaded) {
      scrollRef.current?.scrollTo({
        y: scrollTo.y,
        animated: true,
      });
    }
  }, [scrollTo]);

  useEffect(() => {
    if (scrollBottom) {
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  }, [scrollBottom]);

  return (
    <View>
      <AnimatedTouchable style={[styles.button, style]} onPress={onPressTouch}>
        <Icon name="arrow-up" size={20} />
      </AnimatedTouchable>
      <ScrollView
        refreshControl={refreshControl}
        style={[
          styles.container,
          {
            backgroundColor: backgroundColor || theme.colors.background,
            minHeight: fullHeight
              ? Dimensions.get("window").height -
                NativeModules.StatusBarManager.HEIGHT
              : Dimensions.get("window").height -
                NativeModules.StatusBarManager.HEIGHT -
                60,
          },
        ]}
        ref={scrollRef}
        onScroll={handleScroll}
        // stickyHeaderIndices={sticky}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ flex: 1 }}>{children}</View>
        <StatusBar
          backgroundColor={backgroundColor || theme.colors.background}
          barStyle="dark-content"
        />
      </ScrollView>
    </View>
  );
};

export default PageContainer;

const createStyles = (theme: ExtendedTheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      flexGrow: 1,
    },
    button: {
      position: "absolute",
      bottom: 10,
      right: 10,
      zIndex: 5,
      backgroundColor: `rgba(${hexToRgb(theme.colors.card)}, 0.5)`,
      padding: 10,
      borderRadius: 50,
    },
    main: {
      flex: 1,
    },
  });
