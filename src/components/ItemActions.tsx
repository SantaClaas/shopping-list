import { Animated, Easing, StyleSheet, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { MINIMUM_TOUCH_TARGET_SIZE } from "..";
import { Delete } from "../icons";
import theme from "../theme";

type AnimatedInterpolation = ReturnType<Animated.Value["interpolate"]>;

export function LeftDeleteAction(
  _progress: AnimatedInterpolation,
  drag: AnimatedInterpolation,
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
        <Delete fill={theme.colors.light.errorContainer} />
      </Animated.View>
    </View>
  );
}

export function RightDeleteAction(
  _progress: AnimatedInterpolation,
  drag: AnimatedInterpolation,
  _: Swipeable,
) {
  const scale = drag.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={[{ alignItems: "flex-end" }, actionStyles.delete]}>
      <Animated.View style={{ transform: [{ scale }], opacity: scale }}>
        <Delete fill={theme.colors.light.errorContainer} />
      </Animated.View>
    </View>
  );
}
const actionStyles = StyleSheet.create({
  delete: {
    backgroundColor: theme.colors.light.error,
    justifyContent: "center",
    paddingHorizontal: 12,
    // This fills the space and makes it swipe the whole width
    flex: 1,
  },
});

export const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: theme.spacing.screen.compact,
    backgroundColor: theme.colors.light.surface,
    height: 56,
  },
  headline: {
    color: theme.colors.light.on.surface,
    ...theme.typescale.body.large,
  },
  actions: {
    flexDirection: "row",
  },
  action: {
    ...MINIMUM_TOUCH_TARGET_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
});
