import { Stack } from "expo-router";
import theme from "../theme";
import TopAppBar from "../components/navigation/TopAppBar";

export default function () {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.yellow[50],
        },
        headerShadowVisible: false,
        headerTintColor: theme.green[950],
        contentStyle: {
          backgroundColor: theme.yellow[50],
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
