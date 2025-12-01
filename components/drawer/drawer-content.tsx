import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  // DrawerItemList,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { Image } from "expo-image";
import { Ellipsis } from "lucide-react-native";
import React, { memo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { ThemedText as Text } from "../ThemedText";
import { COLORS } from "../../constants";
import { useChatsStore } from "../../store/chatsStore";

const DrawerContent = memo((props: DrawerContentComponentProps) => {
  const status = useDrawerStatus();
  const chats = useChatsStore((state) => state.chats);

  const navigation = props.navigation;
  const route = props.state.routes;

  console.log(route);

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
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
              marginBottom: 8,
              borderRadius: 12,
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
