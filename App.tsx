import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  useWindowDimensions,
  Pressable,
  Keyboard,
} from "react-native";
import React from "react";
import { ThemedText, ThemedTextWrapper } from "./components/ThemedText";
import { useThemeColor } from "./hooks/useThemeColor";
import {
  KeyboardAvoidingView,
  KeyboardProvider,
} from "react-native-keyboard-controller";
import {
  AudioLines,
  Camera,
  File,
  Ghost,
  Heart,
  ImagePlus,
  LucideIcon,
  Menu as MenuIcon,
  Paperclip,
  ScanSearch,
  Settings2,
  Zap,
} from "lucide-react-native";
import { BlurView } from "expo-blur";
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  DrawerNavigationProp,
  useDrawerProgress,
} from "@react-navigation/drawer";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { AttachFileMenuProvider } from "./lib/attach-file-menu";
import { MenuTrigger } from "./components/grok-attach-file/menu-trigger";
import { Menu } from "./components/grok-attach-file/menu";

const CHAT_BOX_HEIGHT = 100;
const CHAT_BOX_MARGIN_V = 6;
const RADIUS = 28;
const BLUR_INTENSITY = 80;

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function GrokSidebar() {
  // const intensity = useSharedValue<number | undefined>(0);
  // const drawerProgress = useDrawerProgress();
  const { width } = useWindowDimensions();
  const text = useThemeColor("text");
  const background = useThemeColor("background");

  // useAnimatedReaction(
  //   () => drawerProgress.value,
  //   (progress) => {
  //     intensity.value = progress * BLUR_INTENSITY;
  //   }
  // );

  // const animatedStyle = useAnimatedStyle(() => ({
  //   transform: [
  //     {
  //       translateX: drawerProgress.value * (width / 3),
  //     },
  //   ],
  // }));

  return (
    <KeyboardProvider>
      <AttachFileMenuProvider>
        <SafeAreaProvider>
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
                <Header />
                <ScrollView
                  style={styles.screen}
                  contentContainerStyle={styles.screenInner}
                >
                  <Heart color={text + "24"} size={84} />
                </ScrollView>
                <SuggestionBox />
                <ChatBox />
              </Animated.View>
            </KeyboardAvoidingView>
            {/* <AnimatedBlurView
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
            intensity={intensity}
          /> */}
          </SafeAreaView>
          <Menu />
        </SafeAreaProvider>
      </AttachFileMenuProvider>
    </KeyboardProvider>
  );
}

const Header = () => {
  // const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <View style={styles.header}>
      <Pressable
        style={styles.headerLeft}
        // onPress={() => navigation.toggleDrawer()}
        hitSlop={30}
      >
        <ThemedTextWrapper>
          <MenuIcon size={21} />
        </ThemedTextWrapper>
      </Pressable>
      <View>
        <ThemedText style={styles.headerTitle} type="defaultSemiBold">
          Grok
        </ThemedText>
      </View>
      <View style={styles.headerRight}>
        <ThemedTextWrapper>
          <Ghost size={21} />
        </ThemedTextWrapper>
      </View>
    </View>
  );
};

const ChatBox = () => {
  const text = useThemeColor("text");
  return (
    <View
      style={[
        styles.chatBox,
        styles.round,
        {
          backgroundColor: text + "10",
          borderColor: text + "10",
        },
      ]}
    >
      <ThemedTextWrapper style={styles.chatInput}>
        <TextInput
          keyboardAppearance="dark"
          placeholder="Ask Anything"
          selectionColor={text}
        />
      </ThemedTextWrapper>
      <View style={styles.chatActionBar}>
        <View style={styles.cluster}>
          <MenuTrigger />
          {/* <Paperclip size={16} color={text} /> */}
          <Button onPress={() => console.log("Send pressed")}>
            <Zap size={16} color={text} />
          </Button>
        </View>
        <Button
          style={{
            backgroundColor: text,
            paddingHorizontal: 14,
          }}
        >
          <ThemedTextWrapper colorName="background">
            <AudioLines size={16} strokeWidth={2.4} />
          </ThemedTextWrapper>
          <ThemedText
            colorName="background"
            type="defaultSemiBold"
            style={{ fontSize: 15 }}
          >
            Speak
          </ThemedText>
        </Button>
      </View>
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

  return (
    <TouchableOpacity
      style={[
        styles.chatBtn,
        {
          borderColor: text + "10",
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

type Suggestion = {
  icon: LucideIcon;
  title: string;
};

const suggestions: Suggestion[] = [
  { icon: AudioLines, title: "Voice Mode" },
  { icon: ImagePlus, title: "Create Images" },
  { icon: Camera, title: "Open Camera" },
  { icon: ScanSearch, title: "Edit Image" },
  { icon: File, title: "Analyze Docs" },
  { icon: Settings2, title: "Customize Grok" },
];

const SuggestionBox = () => {
  return (
    <View style={styles.suggestionBox}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.suggestionBoxContent}
      >
        {suggestions.map((suggestion, index) => (
          <SuggestionCard key={index} {...suggestion} />
        ))}
      </ScrollView>
    </View>
  );
};

const SuggestionCard = ({ icon: Icon, title }: Suggestion) => {
  const text = useThemeColor("text");
  return (
    <TouchableOpacity
      style={[
        styles.suggestionCard,
        styles.round,
        {
          borderColor: text + "10",
          backgroundColor: text + "10",
        },
      ]}
      activeOpacity={0.8}
      onPress={() => console.log(`Suggestion pressed: ${title}`)}
    >
      <Icon size={22} color={text} style={{ opacity: 0.8 }} />
      <ThemedText colorName="text">{title}</ThemedText>
    </TouchableOpacity>
  );
};

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
