import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedText } from "../components/ThemedText";
import { useThemeColor } from "../hooks/useThemeColor";
import {
  AudioLines,
  Camera,
  File,
  ImagePlus,
  LucideIcon,
  ScanSearch,
  Settings2,
} from "lucide-react-native";
import { VALUES } from "../constants/Values";

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

export default function SuggestionBox() {
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
}

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
  suggestionBox: {},
  round: {
    borderRadius: VALUES.RADIUS,
    borderCurve: "continuous",
    borderWidth: 1,
  },
  suggestionBoxContent: {
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: VALUES.CHAT_BOX_MARGIN_V,
    gap: 8,
  },
  suggestionCard: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 10,
    borderRadius: VALUES.RADIUS,
    // backgroundColor: "#f0f0f0",
  },
});
