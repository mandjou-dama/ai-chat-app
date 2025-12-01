// src/navigation/RootDrawer.tsx
import { Platform, useColorScheme, useWindowDimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { useThemeColor } from "../hooks/useThemeColor";
import DrawerContent from "../components/drawer/drawer-content";
import { COLORS } from "../constants";
import ChatStack from "./ChatStack";

const Drawer = createDrawerNavigator();

export default function RootDrawer() {
  const { width } = useWindowDimensions();
  const text = useThemeColor("text");
  const theme = useColorScheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
        swipeEdgeWidth: width,
        swipeMinDistance: width * 0.025,
        drawerStyle: {
          width: width * 0.85,
          backgroundColor: COLORS.black,
        },
        drawerActiveTintColor: text,
        drawerActiveBackgroundColor: `${text}10`,
        drawerInactiveTintColor: text + "90",
        overlayColor:
          Platform.OS === "ios" ? "transparent" : COLORS.black + "80",
      }}
    >
      {/* Instead of HomeScreen, we use ChatStack */}
      <Drawer.Screen name="ChatStack" component={ChatStack} />
    </Drawer.Navigator>
  );
}
