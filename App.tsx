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
  Text,
} from "react-native";
import React from "react";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import {
  AudioLines,
  Camera,
  File,
  Ghost,
  HeartCrackIcon,
  ImagePlus,
  LucideIcon,
  Menu,
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
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const CHAT_BOX_HEIGHT = 100;
const CHAT_BOX_MARGIN_V = 6;
const RADIUS = 28;
const BLUR_INTENSITY = 80;

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function GrokSidebar() {
  const intensity = useSharedValue<number | undefined>(0);
  const drawerProgress = useDrawerProgress();
  const { width } = useWindowDimensions();

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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={CHAT_BOX_MARGIN_V}
      >
        <Animated.View style={[styles.container, animatedStyle]}>
          <Header />
          <ScrollView
            style={styles.screen}
            contentContainerStyle={styles.screenInner}
          >
            {/* <HeartCrackIcon color={text + "24"} size={84} /> */}
          </ScrollView>
          <SuggestionBox />
          <ChatBox />
        </Animated.View>
      </KeyboardAvoidingView>
      <AnimatedBlurView
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
        intensity={intensity}
      />
    </SafeAreaView>
  );
}

const Header = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <View style={styles.header}>
      <Pressable
        style={styles.headerLeft}
        onPress={() => navigation.toggleDrawer()}
        hitSlop={30}
      >
        <Menu size={21} />
      </Pressable>
      <View>
        <Text style={styles.headerTitle}>Grok</Text>
      </View>
      <View style={styles.headerRight}>
        <Ghost size={21} />
      </View>
    </View>
  );
};

const ChatBox = () => {
  return (
    <View
      style={[
        styles.chatBox,
        styles.round,
        {
          backgroundColor: "#00000010",
          borderColor: "#ffffff20",
        },
      ]}
    >
      <Text style={styles.chatInput}>
        <TextInput placeholder="Ask Anything" selectionColor="#ffffff83" />
      </Text>
      <View style={styles.chatActionBar}>
        <View style={styles.cluster}>
          <Button onPress={() => console.log("Send pressed")}>
            <Paperclip size={16} color="#ffffff83" />
          </Button>
          <Button onPress={() => console.log("Send pressed")}>
            <Zap size={16} color="#ffffff83" />
          </Button>
        </View>
        <Button
          style={{
            backgroundColor: "#ffffff83",
            paddingHorizontal: 14,
          }}
        >
          <AudioLines size={16} strokeWidth={2.4} />

          <Text style={{ fontSize: 15 }}>Speak</Text>
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
  return (
    <TouchableOpacity
      style={[
        styles.chatBtn,
        {
          borderColor: "#ffffff83",
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
  return (
    <TouchableOpacity
      style={[
        styles.suggestionCard,
        styles.round,
        {
          backgroundColor: "#00000010",
          borderColor: "#ffffff20",
        },
      ]}
      activeOpacity={0.8}
      onPress={() => console.log(`Suggestion pressed: ${title}`)}
    >
      <Icon size={22} color={"#fff"} style={{ opacity: 0.8 }} />
      <Text style={{ color: "#fff", opacity: 0.8 }}>{title}</Text>
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
    borderWidth: 2,
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
    borderWidth: 2,
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
    padding: 16,
    gap: 10,
    borderRadius: RADIUS,
    backgroundColor: "#f0f0f0",
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
