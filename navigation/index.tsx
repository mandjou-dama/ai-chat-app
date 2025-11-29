import { Linking, useColorScheme, useWindowDimensions } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import { useThemeColor } from "../hooks/useThemeColor";
import DrawerContent from "../components/drawer/drawer-content";

import HomeScreen from "./screens/Home";

const Drawer = createDrawerNavigator();

const RootDrawer = () => {
  const { width } = useWindowDimensions();
  const text = useThemeColor("text");
  const backgroundColor = useThemeColor("background");
  const theme = useColorScheme();
  const isLight = theme === "light";

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
          backgroundColor: backgroundColor,
        },

        drawerActiveTintColor: text,
        drawerActiveBackgroundColor: `${text}10`,
        drawerInactiveTintColor: text + "90",
        overlayColor: "transparent",
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Help"
        onPress={() => Linking.openURL("https://mywebsite.com/help")}
      />
    </DrawerContentScrollView>
  );
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootDrawer />
    </NavigationContainer>
  );
};
export default Navigation;
