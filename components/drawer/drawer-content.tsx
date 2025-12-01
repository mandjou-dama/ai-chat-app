import { useThemeColor } from "../../hooks/useThemeColor";
import {
  DrawerContentComponentProps,
  // DrawerItemList,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { Image } from "expo-image";
import { Ellipsis, LogOut } from "lucide-react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText as Text } from "../ThemedText";
import { DrawerItemList } from "./drawer-item-list";
import { COLORS } from "../../constants";

const DrawerContent = memo((props: DrawerContentComponentProps) => {
  const demos = (props.state?.routes?.length || 0) - 1 || 0;
  const routeNames = props.state?.routes.map((route) => route.name) || [];
  // console.log("Route names:", routeNames);

  const status = useDrawerStatus();
  const [focused, setFocused] = useState(false);

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      {/* <Header routes={demos} /> */}
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <DrawerItemList {...props} />
      </ScrollView>
      <DrawerFooter />
    </SafeAreaView>
  );
});

const Header = ({ routes }: { routes: number }) => {
  const text = useThemeColor("text");
  const tint = useThemeColor("tint");

  return (
    <View
      style={[
        styles.header,
        {
          borderColor: text + "10",
        },
      ]}
    >
      {/* <Pressable style={styles.headerButton} onPress={handlePress}>
        <Home size={20} color={"#A0A0A0"} />
        <ThemedText style={[styles.headerText, { color: textColor }]}>
          Home
        </ThemedText>
      </Pressable>
      <ThemedText>
        {routes}
        <Text style={styles.demoText}>{routes > 1 ? " demos" : " demo"}</Text>
      </ThemedText> */}

      <View style={styles.cluster}>
        <Image
          //   source={require("@/assets/images/dp.png")}
          source={{
            uri: "https://images.pexels.com/photos/4029925/pexels-photo-4029925.jpeg",
          }}
          // style={styles.image}
        />
        <View style={{}}>
          <Text style={styles.headerText}>Mandjou Dama</Text>
          <Text style={[styles.headerTextNumber, { color: tint }]}>
            +223 78 43 73 23
          </Text>
        </View>
      </View>
      <View style={styles.cluster}></View>
    </View>
  );
};

const DrawerFooter = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.footerLeft}>
        <Image
          source={require("../../assets/profile.jpeg")}
          style={styles.footerAvatar}
        />
        <Text style={styles.footerTitle}>Mandjou Dama</Text>
      </View>

      <Pressable hitSlop={30}>
        <Ellipsis size={24} color={COLORS.white + "80"} />
      </Pressable>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 12,
    paddingTop: 24,
    gap: 6,
  },
  header: {
    marginHorizontal: 12,
    paddingHorizontal: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingVertical: 14,
  },
  headerButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 6,
  },
  headerText: {
    fontSize: 15,
    marginBottom: 3,
  },
  headerTextNumber: {
    fontSize: 14,
  },
  demoText: {
    fontSize: 14,
    opacity: 0.7,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  footerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  footerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  footerTitle: {
    // position: "absolute",
    // left: "50%",
    // transform: [{ translateX: "-50%" }],
    fontSize: 16,
    fontFamily: "InterSemiBold",
    color: COLORS.white,
  },
  cluster: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  contactIcon: {
    padding: 4,
  },
});
