import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Pressable,
  Animated,
} from "react-native";
import theme from "./theme";
import {
  AddShoppingCart,
  CheckBoxOutlineBlank,
  Delete,
  RemoveShoppingCart,
} from "./icons";
import { useState } from "react";
import { Swipeable } from "react-native-gesture-handler";

export type Item = {
  name: string;
};

type AnimatedInterpolation = ReturnType<Animated.Value["interpolate"]>;

function LeftDeleteAction(
  _progress: AnimatedInterpolation,
  drag: AnimatedInterpolation
  //   _: Swipeable
) {
  const scale: Animated.AnimatedInterpolation<string | number> =
    drag.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
  return (
    <View style={[{ alignItems: "flex-start" }, actionStyles.delete]}>
      <Animated.View style={{ transform: [{ scale }], opacity: scale }}>
        <Delete fill={theme.yellow[50]} />
      </Animated.View>
    </View>
  );
}

function RightDeleteAction(
  _progress: AnimatedInterpolation,
  drag: AnimatedInterpolation,
  _: Swipeable
) {
  const scale = drag.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={[{ alignItems: "flex-end" }, actionStyles.delete]}>
      <Animated.View style={{ transform: [{ scale }], opacity: scale }}>
        <Delete fill={theme.yellow[50]} />
      </Animated.View>
    </View>
  );
}
const actionStyles = StyleSheet.create({
  delete: {
    backgroundColor: theme.red[500],
    justifyContent: "center",
    paddingHorizontal: 12,
    // This fills the space and makes it swipe the whole width
    flex: 1,
  },
});

function handleDeleteSwipe() {
  console.debug("Delete swipe");
}

function ListItem({ name }: Item) {
  const [isTaken, setIsTaken] = useState<boolean>(false);

  // Based on https://youtu.be/JxN9W9PRlUQ
  return (
    <Swipeable
      renderLeftActions={LeftDeleteAction}
      renderRightActions={RightDeleteAction}
      onSwipeableOpen={handleDeleteSwipe}
    >
      <View style={styles.item}>
        <Text style={styles.headline}>{name}</Text>
        <View style={styles.actions}>
          <Pressable onPress={() => setIsTaken(!isTaken)} style={styles.action}>
            {isTaken ? (
              <RemoveShoppingCart fill={theme.green[950]} />
            ) : (
              <AddShoppingCart fill={theme.green[950]} />
            )}
          </Pressable>

          <Pressable style={styles.action}>
            <CheckBoxOutlineBlank fill={theme.green[950]} />
          </Pressable>
        </View>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: theme.spacing.screen.compact,
    paddingVertical: 4,
    height: 56,
    backgroundColor: theme.yellow[50],
  },
  headline: {
    color: theme.green[950],
    ...theme.typescale.body.large,
  },
  actions: {
    flexDirection: "row",
  },
  action: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListItem;
