import {
  Text,
  StyleSheet,
  View,
  Pressable,
  Animated,
  Easing,
} from "react-native";
import theme from "./theme";
import {
  AddShoppingCart,
  CheckBoxOutlineBlank,
  Delete,
  RemoveShoppingCart,
} from "./icons";
import { useRef, useState } from "react";
import { Swipeable } from "react-native-gesture-handler";
import {
  default as Reanimated,
  runOnJS,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

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

type ListItemProperties = {
  item: Item;
  onDelete: () => void;
};

function ListItem({ item, onDelete }: ListItemProperties) {
  const height = useSharedValue(56);
  function startDeleteAnimation(callback: () => void) {
    height.value = withTiming(0, undefined, () => runOnJS(callback)());
  }

  function handleDeleteSwipe() {
    startDeleteAnimation(onDelete);
  }

  const [isTaken, setIsTaken] = useState<boolean>(false);

  // Based on https://youtu.be/JxN9W9PRlUQ
  //TODO Fade out icon when shrinking height on delete
  //TODO add haptic feedback when crossing the delete swipe threshold in the middle
  return (
    <Swipeable
      renderLeftActions={LeftDeleteAction}
      renderRightActions={RightDeleteAction}
      onSwipeableOpen={handleDeleteSwipe}
    >
      <Reanimated.View
        style={[
          styles.item,
          {
            height,
          },
        ]}
      >
        <Text style={styles.headline}>{item.name}</Text>
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
      </Reanimated.View>
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
    backgroundColor: theme.yellow[50],
    height: 56,
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
