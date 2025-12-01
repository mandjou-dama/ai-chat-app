// src/navigation/RootDrawer.tsx
import { Platform, useWindowDimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import DrawerContent from "../components/drawer/drawer-content";
import { COLORS } from "../constants";
import ChatStack from "./ChatStack";

const Drawer = createDrawerNavigator();

export default function RootDrawer() {
  const { width } = useWindowDimensions();

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
        drawerActiveTintColor: COLORS.white,
        drawerActiveBackgroundColor: `${COLORS.white}10`,
        drawerInactiveTintColor: COLORS.white + "90",
        overlayColor:
          Platform.OS === "ios" ? "transparent" : COLORS.black + "80",
      }}
    >
      {/* Instead of HomeScreen, we use ChatStack */}
      <Drawer.Screen name="ChatStack" component={ChatStack} />
    </Drawer.Navigator>
  );
}
