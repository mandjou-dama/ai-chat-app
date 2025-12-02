import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  // DrawerItemList,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { Image } from "expo-image";
import { CircleFadingPlus, Ellipsis } from "lucide-react-native";
import React, { memo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { ThemedText as Text } from "../ThemedText";
import { COLORS, SPACES } from "../../constants";
import { useChatsStore } from "../../store/chatsStore";
import { Button } from "../button";

const DrawerContent = memo((props: DrawerContentComponentProps) => {
  const status = useDrawerStatus();
  const chats = useChatsStore((state) => state.chats);

  const navigation = props.navigation;
  const routes = props.state.routes[props.state.index];
  const route = (
    routes.state?.routes[0].params as { chatId?: string } | undefined
  )?.chatId;

  // console.log(JSON.stringify(routes.state?.routes[0].params?.chatId, null, 2));

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      <DrawerHeader />
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        {chats.map((chat) => (
          <Pressable
            key={chat.id}
            onPress={() =>
              navigation.navigate("ChatStack", {
                screen: "Chat",
                params: { chatId: chat.id },
              })
            }
            style={{
              backgroundColor:
                route === chat.id ? COLORS.white + "10" : "transparent",
              borderWidth: route === chat.id ? 1 : 0,
              borderColor: COLORS.white + "10",
              borderCurve: "continuous",
              borderRadius: 50,
            }}
          >
            <Text numberOfLines={1} style={{ padding: 16, color: "white" }}>
              {chat.title}
            </Text>
          </Pressable>
        ))}
      </DrawerContentScrollView>
      <DrawerFooter />
    </SafeAreaView>
  );
});

const DrawerHeader = () => {
  return <Text style={styles.drawerHeaderTitle}>Chats history</Text>;
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

      <View style={styles.cluster}>
        <Button>
          <Ellipsis size={18} color={COLORS.white} />
        </Button>
        <Button>
          <CircleFadingPlus color={COLORS.white} size={18} />
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
  drawerHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  searchInput: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.white + "10",
    backgroundColor: COLORS.white + "10",
    borderCurve: "continuous",
    color: COLORS.white,
    flex: 1,
  },
  drawerHeaderTitle: {
    marginTop: SPACES.lg,
    paddingHorizontal: SPACES.lg * 1.5,
    fontSize: 14,
    textTransform: "uppercase",
    fontFamily: "InterSemiBold",
    color: COLORS.white + "60",
  },
  scrollViewContent: {
    paddingTop: 10,
    flexGrow: 1,
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
