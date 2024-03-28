import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import ListItem1 from "../components/ListItem1";
import { ArrowRight } from "../icons";
import theme from "../theme";

export default function () {
  return (
    <View>
      {/* <Pressable
        android_ripple={
          {
            // Seems like you need to set either color or radius for ripple to show
            // radius: 100,
            // color: "red",
          }
        }
      >
        <Text
          style={{
            width: 50,
            height: 50,
            backgroundColor: "blue",
            opacity: 0.5,
          }}
        >
          Press me
        </Text>
      </Pressable> */}
      <Link href="/lists/1" asChild>
        <Pressable
          android_ripple={{
            color: theme.state.pressed.stateLayerOpacity,
          }}
        >
          <ListItem1
            trailingIcon={<ArrowRight fill={theme.colors.light.on.surface} />}
          />
        </Pressable>
      </Link>
    </View>
  );
}
