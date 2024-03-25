import { GestureHandlerRootView } from "react-native-gesture-handler";
import ItemsList from "./src/components/ItemsList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ItemsList />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
