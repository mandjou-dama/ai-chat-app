import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";

export const Button = ({
  children,
  onPress,
  style,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) => {
  const text = useThemeColor("text");

  return (
    <TouchableOpacity
      style={[
        {
          borderColor: text + "10",
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
