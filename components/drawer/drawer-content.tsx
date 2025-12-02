import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Text } from "react-native";
import { Image } from "expo-image";
import { CircleFadingPlus, Ellipsis, Pin } from "lucide-react-native";
import React, { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACES } from "../../constants";
import { useChatsStore } from "../../store/chatsStore";
import { Button } from "../button";

const DrawerContent = memo((props: DrawerContentComponentProps) => {
  const chats = useChatsStore((state) => state.chats);

  const navigation = props.navigation;
  const routes = props.state.routes[props.state.index];
  const route = (
    routes.state?.routes[0].params as { chatId?: string } | undefined
  )?.chatId;

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      <DrawerHeader title="All chats" />
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        {chats.map((chat) => (
          <View
            key={chat.id}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
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
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  padding: 16,
                  color: "white",
                  maxWidth: chat.pinned ? "92%" : "100%",
                }}
              >
                {chat.title}
              </Text>
              {chat.pinned && <Pin size={16} color={COLORS.white + "60"} />}
            </Pressable>
          </View>
        ))}
      </DrawerContentScrollView>
      <DrawerFooter />
    </SafeAreaView>
  );
});

const DrawerHeader = ({ title }: { title: string }) => {
  return <Text style={styles.drawerHeaderTitle}>{title}</Text>;
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
