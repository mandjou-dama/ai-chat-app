// src/navigation/Navigation.tsx
import { NavigationContainer } from "@react-navigation/native";
import RootDrawer from "./RootDrawer";

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootDrawer />
    </NavigationContainer>
  );
}
