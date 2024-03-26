import { Stack } from "expo-router";

export default function () {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Shopping Lists" }} />
      <Stack.Screen name="lists/[id]" options={{ headerTitle: "List" }} />
    </Stack>
  );
}
