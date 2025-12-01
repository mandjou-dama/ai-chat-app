import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Braces,
  ImagePlus,
  Lightbulb,
  LucideIcon,
  MessageCircle,
  ScanSearch,
  File,
} from "lucide-react-native";
import { COLORS, SPACES } from "../constants";
import { useKeyboardState } from "react-native-keyboard-controller";
import Animated, { Easing, FadeIn, FadeOut } from "react-native-reanimated";

type Suggestion = {
  icon: LucideIcon;
  title: string;
  color?: string;
};

const suggestions: Suggestion[] = [
  { icon: MessageCircle, title: "Ask anything", color: COLORS.blue },
  { icon: ImagePlus, title: "Create Images", color: COLORS.purple },
  { icon: Braces, title: "Code", color: COLORS.green },
  { icon: ScanSearch, title: "Edit Image", color: COLORS.orange },
  { icon: File, title: "Analyze Docs", color: COLORS.yellow },
  { icon: Lightbulb, title: "Brainstorm", color: COLORS.pink },
];

export default function NewChatBody() {
  const keyboardState = useKeyboardState();

  return (
    <View style={styles.container}>
      <Text style={styles.helloText}>
        Hi Mandjou, how can I help you today?
      </Text>

      <Animated.View entering={FadeIn.delay(0)} exiting={FadeOut.delay(0)}>
        <View style={styles.suggestionsContainer}>
          {suggestions.map((suggestion, index) => (
            <View key={suggestion.title + index} style={styles.suggestion}>
              <suggestion.icon color={suggestion.color} size={18} />
              <Text style={styles.suggestionText}>{suggestion.title}</Text>
            </View>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: SPACES.lg * 16,
  },
  helloText: {
    fontSize: 28,
    lineHeight: 38,
    color: COLORS.white,
    marginBottom: SPACES.lg,
  },
  suggestionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: 12,
    marginTop: SPACES.lg,
  },
  suggestion: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingLeft: 10,
    paddingRight: 16,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.white + "10",
    backgroundColor: COLORS.white + "10",
    borderCurve: "continuous",
    gap: 8,
  },
  suggestionText: {
    fontSize: 14,
    color: COLORS.white,
  },
});
