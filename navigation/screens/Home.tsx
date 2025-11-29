import { StyleSheet, ScrollView, useWindowDimensions } from "react-native";
import React from "react";
import { useThemeColor } from "../../hooks/useThemeColor";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { Heart } from "lucide-react-native";
import { BlurView } from "expo-blur";
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useDrawerProgress } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { Menu } from "../../components/grok-attach-file/menu";
import ChatHeader from "../../components/chat-header";
import ChatFooter from "../../components/chat-footer";
import SuggestionBox from "../../components/suggestion-box";

const CHAT_BOX_HEIGHT = 100;
const CHAT_BOX_MARGIN_V = 6;
const RADIUS = 28;
const BLUR_INTENSITY = 80;

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function HomeScreen() {
  const intensity = useSharedValue<number | undefined>(0);
  const drawerProgress = useDrawerProgress();
  const { width } = useWindowDimensions();
  const text = useThemeColor("text");
  const background = useThemeColor("background");

  useAnimatedReaction(
    () => drawerProgress.value,
    (progress) => {
      intensity.value = progress * BLUR_INTENSITY;
    }
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: drawerProgress.value * (width / 3),
      },
    ],
  }));

  return (
    <React.Fragment>
      <SafeAreaView
        style={[styles.container, { backgroundColor: background }]}
        edges={["top", "bottom"]}
      >
        <KeyboardAvoidingView
          behavior="padding"
          style={{ flex: 1 }}
          keyboardVerticalOffset={CHAT_BOX_MARGIN_V}
        >
          <Animated.View style={[styles.container]}>
            <ChatHeader />
            <ScrollView
              style={styles.screen}
              contentContainerStyle={styles.screenInner}
            >
              <Heart color={text + "24"} size={84} />
            </ScrollView>
            <SuggestionBox />
            <ChatFooter />
          </Animated.View>
        </KeyboardAvoidingView>
        <AnimatedBlurView
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
          tint="dark"
          intensity={intensity}
        />
      </SafeAreaView>
      <Menu />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
    padding: 16,
  },
  screenInner: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  round: {
    borderRadius: RADIUS,
    borderCurve: "continuous",
    borderWidth: 1,
  },
  chatBox: {
    minHeight: CHAT_BOX_HEIGHT,
    marginHorizontal: 12,
    marginVertical: CHAT_BOX_MARGIN_V,
    overflow: "hidden",
  },
  chatInput: {
    flex: 1,
    width: "100%",
    padding: 14,
    paddingBottom: 8,
  },
  chatActionBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    paddingTop: 5,
  },
  chatBtn: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderCurve: "continuous",
    gap: 5,
  },
  cluster: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  suggestionBox: {},
  suggestionBoxContent: {
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: CHAT_BOX_MARGIN_V,
    gap: 8,
  },
  suggestionCard: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 10,
    borderRadius: RADIUS,
    // backgroundColor: "#f0f0f0",
  },
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
  headerTitle: {},
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
});
