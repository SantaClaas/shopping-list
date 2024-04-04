import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TopAppBar from "../components/navigation/TopAppBar";
import theme from "../theme";

const queryClient = new QueryClient();

export default function () {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.light.surface,
            },
            headerShadowVisible: false,
            headerTintColor: theme.colors.light.on.surface,
            contentStyle: {
              backgroundColor: theme.colors.light.surface,
            },
            header: TopAppBar,
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerTitle: "Shopping Lists",
            }}
          />
          <Stack.Screen
            name="lists/new"
            options={{ headerTitle: "Shopping Lists" }}
          />
          <Stack.Screen name="lists/[id]" options={{ headerTitle: "List" }} />
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
          <Stack.Screen name="lists/join" options={{ headerShown: false }} />
        </Stack>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
