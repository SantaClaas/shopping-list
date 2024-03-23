import { GestureHandlerRootView } from "react-native-gesture-handler";
import ItemsList from "./ItemsList";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ItemsList />
    </GestureHandlerRootView>
  );
}
