import React, { FC } from "react";
import { Keyboard, Pressable, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Paperclip } from "lucide-react-native";
import { useAttachFileMenu } from "../../lib/attach-file-menu";

// grok-attach-file-menu-animation 🔽

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const MenuTrigger: FC = () => {
  const { isMenuOpen } = useAttachFileMenu();

  const rContainerStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isMenuOpen.get() ? 0 : 1, {
      duration: 200,
      easing: Easing.in(Easing.ease),
    }),
    transform: [
      {
        scale: isMenuOpen.get()
          ? withTiming(4)
          : withSpring(1, { damping: 70, stiffness: 1600 }),
      },
    ],
  }));

  return (
    <AnimatedPressable
      style={[
        {
          width: 36,
          height: 36,
          aspectRatio: 1,
          borderRadius: 9999,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.05)",
        },
        rContainerStyle,
        styles.container,
      ]}
      onPress={() => {
        isMenuOpen.set(true);
        Keyboard.dismiss();
      }}
    >
      <Paperclip size={16} color="white" />
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderCurve: "continuous",
  },
});

// grok-attach-file-menu-animation 🔼
