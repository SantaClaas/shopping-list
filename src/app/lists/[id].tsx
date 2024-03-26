import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function () {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>List id: {id}</Text>
    </View>
  );
}
