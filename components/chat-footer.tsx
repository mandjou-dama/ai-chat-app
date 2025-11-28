import { View, StyleSheet, TextInput, Pressable } from "react-native";
import { ThemedText, ThemedTextWrapper } from "./ThemedText";
import { MenuTrigger } from "./grok-attach-file/menu-trigger";
import { AudioLines, Zap } from "lucide-react-native";
import { useThemeColor } from "../hooks/useThemeColor";
import { VALUES } from "../constants/Values";
import { Button } from "./button";

export default function ChatFooter() {
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
}

const styles = StyleSheet.create({
  round: {
    borderRadius: VALUES.RADIUS,
    borderCurve: "continuous",
    borderWidth: 1,
  },
  chatBox: {
    minHeight: VALUES.CHAT_BOX_HEIGHT,
    marginHorizontal: 12,
    marginVertical: VALUES.CHAT_BOX_MARGIN_V,
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
