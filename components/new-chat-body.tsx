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
  return (
    <View>
      <Text style={styles.helloText}>
        Hi Mandjou, how can I help you today?
      </Text>

      <View style={styles.suggestionsContainer}>
        {suggestions.map((suggestion) => (
          <View key={suggestion.title} style={styles.suggestion}>
            <suggestion.icon color={suggestion.color} size={18} />
            <Text style={styles.suggestionText}>{suggestion.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
