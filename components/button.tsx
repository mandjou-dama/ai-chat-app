import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { COLORS } from "../constants";

export const Button = ({
  children,
  onPress,
  style,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          borderColor: COLORS.white + "10",
          padding: 8,
          borderWidth: 1,
          borderRadius: 50,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          borderCurve: "continuous",
          gap: 5,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {children}
    </TouchableOpacity>
  );
};
