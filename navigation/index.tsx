import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "./screens/Home";
import { createStaticNavigation } from "@react-navigation/native";

const RootDrawer = createDrawerNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        headerShown: false,
      },
    },
  },
});

const Navigation = createStaticNavigation(RootDrawer);
export default Navigation;
