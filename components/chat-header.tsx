import { Pressable, View, StyleSheet } from "react-native";
import { ThemedText, ThemedTextWrapper } from "./ThemedText";
import { Ghost, MenuIcon } from "lucide-react-native";

export default function ChatHeader() {
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
}

const styles = StyleSheet.create({
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
