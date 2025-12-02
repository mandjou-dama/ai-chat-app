import React, { FC } from "react";
import { MenuItemsWrapper } from "./menu-items-wrapper";
import { MenuItem } from "./menu-item";
import {
  Camera,
  File,
  Fullscreen,
  ImagePlus,
  Images,
} from "lucide-react-native";
import { simulatePress } from "../../shared/simulate-press";
import { COLORS } from "../../constants";

// grok-attach-file-menu-animation 🔽

// Consistent icon sizing across all menu items for visual harmony
const _iconSize = 16; // Optimal size for 40px circular containers (2.5x padding ratio)
const _iconColor = COLORS.white; // High contrast against white icon backgrounds

export const MenuItems: FC = () => {
  return (
    <MenuItemsWrapper>
      {/* Primary actions: solid white backgrounds for prominence */}
      <MenuItem
        icon={<Camera size={_iconSize} color={_iconColor} />}
        label="Camera"
        onPress={simulatePress}
      />
      <MenuItem
        icon={<Images size={_iconSize} color={_iconColor} />}
        label="Photos"
        onPress={simulatePress}
      />
      <MenuItem
        icon={<File size={_iconSize} color={_iconColor} />}
        label="Files"
        onPress={simulatePress}
        style={{
          marginBottom: 24,
        }}
      />
      {/* Secondary actions: transparent backgrounds with borders for distinction */}
      <MenuItem
        icon={<ImagePlus size={_iconSize} color={_iconColor} />} // White icons for visibility on transparent bg
        label="Create image"
        iconContainerClassName={{
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: COLORS.white + "20",
        }}
        onPress={simulatePress}
      />
      <MenuItem
        icon={<Fullscreen size={_iconSize} color={_iconColor} />}
        label="Edit image"
        iconContainerClassName={{
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: COLORS.white + "20",
        }}
        onPress={simulatePress}
      />
    </MenuItemsWrapper>
  );
};

// grok-attach-file-menu-animation 🔼
