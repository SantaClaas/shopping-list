import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function () {
  return (
    <View>
      <Text>Helo</Text>
      <Link href="/lists/1">List 1</Link>
      <Link href="/lists/2">List 2</Link>
    </View>
  );
}
