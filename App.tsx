import { KeyboardProvider } from "react-native-keyboard-controller";
import Navigation from "./navigation";
import { AttachFileMenuProvider } from "./lib/attach-file-menu";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
