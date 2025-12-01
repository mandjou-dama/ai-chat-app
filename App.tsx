import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigation from "./navigation/Navigation";
import { AttachFileMenuProvider } from "./lib/attach-file-menu";

export default function App() {
  return (
    <KeyboardProvider>
      <AttachFileMenuProvider>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </AttachFileMenuProvider>
    </KeyboardProvider>
  );
}
