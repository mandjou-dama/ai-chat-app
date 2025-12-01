import { Pressable, View, StyleSheet, Text } from "react-native";
import { ThemedText, ThemedTextWrapper } from "./ThemedText";
import {
  CircleFadingPlus,
  Ghost,
  MenuIcon,
  MessageCircle,
  SquarePen,
} from "lucide-react-native";
import { Image } from "expo-image";
import { COLORS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

export default function ChatHeader() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <View style={styles.header}>
      <Pressable
        style={styles.headerLeft}
        onPress={() => navigation.toggleDrawer()}
        hitSlop={30}
      >
        <Image
          source={require("../assets/profile.jpeg")}
          style={styles.headerAvatar}
        />
      </Pressable>
      <Text style={styles.headerTitle}>Nothing AI</Text>
      <View style={styles.headerRight}>
        <CircleFadingPlus color={COLORS.white} size={21} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  headerTitle: {
    // position: "absolute",
    // left: "50%",
    // transform: [{ translateX: "-50%" }],
    fontSize: 16,
    fontFamily: "InterSemiBold",
    color: COLORS.white,
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: 32,
    height: 32,
  },
});
