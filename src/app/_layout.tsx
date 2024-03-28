import { Stack } from "expo-router";
import TopAppBar from "../components/navigation/TopAppBar";
import theme from "../theme";

export default function () {
  console.log("theme", theme.colors.light.surface);
  return (
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
      <Stack.Screen name="lists/[id]" options={{ headerTitle: "List" }} />
    </Stack>
  );
}
