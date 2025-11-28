import { useThemeColor } from "../../hooks/useThemeColor";
import {
  DrawerContentComponentProps,
  // DrawerItemList,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { Image } from "expo-image";
import { Github, Linkedin, LogOut } from "lucide-react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import {
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

const DrawerContent = memo((props: DrawerContentComponentProps) => {
  const demos = (props.state?.routes?.length || 0) - 1 || 0;
  const routeNames = props.state?.routes.map((route) => route.name) || [];
  // console.log("Route names:", routeNames);

  const status = useDrawerStatus();
  const [focused, setFocused] = useState(false);

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      <Header routes={demos} />
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
  const textColor = text + "EA";

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
          style={styles.image}
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

const Button = ({
  children,
  onPress,
  style,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) => {
  const text = useThemeColor("text");
  const tint = useThemeColor("tint");

  return (
    <TouchableOpacity
      style={[
        styles.chatBtn,
        {
          borderColor: text + "10",
          // backgroundColor: text + "10",
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

const DrawerFooter = () => {
  const text = useThemeColor("text");
  const tint = useThemeColor("tint");
  return (
    <View style={styles.footer}>
      <View style={styles.cluster}>
        <Button>
          <LogOut stroke={tint} size={21} />
          <Text style={styles.footerText}>Se déconnecter</Text>
        </Button>
      </View>
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
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  chatBtn: {
    padding: 8,
    paddingVertical: 10,
    borderWidth: 2,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderCurve: "continuous",
    width: 170,
    gap: 5,
  },
  image: {
    width: 32,
    aspectRatio: 1,
    borderRadius: 16,
  },
  footerText: {
    fontSize: 16,
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
