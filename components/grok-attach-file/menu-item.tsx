import React, { FC } from "react";
import { View, Text, Pressable, StyleSheetProperties } from "react-native";
import { COLORS } from "../../constants";

// grok-attach-file-menu-animation 🔽

type Props = {
  icon: React.ReactNode;
  label: string;
  style?: View["props"]["style"];
  iconContainerClassName?: View["props"]["style"];
  onPress?: () => void;
};

export const MenuItem: FC<Props> = ({
  icon,
  label,
  style,
  iconContainerClassName,
  onPress,
}) => {
  return (
    <Pressable
      style={[
        style,
        {
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        },
      ]}
      onPress={onPress}
    >
      <View
        style={[
          {
            width: 38,
            height: 38,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 9999,
            backgroundColor: COLORS.white + "10",
            borderCurve: "continuous",
            borderWidth: 1,
            borderColor: COLORS.white + "20",
          },
          iconContainerClassName,
        ]}
      >
        {icon}
      </View>
      <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "medium" }}>
        {label}
      </Text>
    </Pressable>
  );
};

// grok-attach-file-menu-animation 🔼
