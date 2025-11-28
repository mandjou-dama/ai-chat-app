import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { MenuItems } from "./menu-items";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Backdrop } from "./backdrop";
import { Overlay } from "./overlay";
import { RecentPhotos } from "./recent-photos";
import { useAttachFileMenu } from "../../lib/attach-file-menu";

// grok-attach-file-menu-animation 🔽

export const Menu: FC = () => {
  const { isMenuOpen } = useAttachFileMenu();

  // Pointer events optimization: prevents touch events when menu is closed
  // Avoids invisible overlay blocking interactions with underlying content
  const rContainerStyle = useAnimatedStyle(() => {
    return {
      pointerEvents: isMenuOpen.get() ? "auto" : "none",
    };
  });

  return (
    // Full-screen container with bottom alignment for menu slide-up effect
    // px-8 provides consistent horizontal padding for all menu components
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        rContainerStyle,
        {
          justifyContent: "flex-end",
          paddingHorizontal: 32,
        },
      ]}
    >
      {/* Platform-specific blur/overlay backdrop */}
      <Backdrop />
      {/* Top-positioned animated header element */}
      <RecentPhotos />
      {/* Main menu with staggered slide-in animation */}
      <MenuItems />
      {/* iOS-only blur overlay for depth effect */}
      <Overlay />
    </Animated.View>
  );
};

// grok-attach-file-menu-animation 🔼
