import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import ListItem1 from "../components/ListItem1";
import { ArrowRight } from "../icons";

export default function () {
  return (
    <View>
      <Link href="/lists/1" asChild>
        <Pressable android_ripple={{}}>
          <ListItem1 trailingIcon={<ArrowRight />} />
        </Pressable>
      </Link>
    </View>
  );
}
