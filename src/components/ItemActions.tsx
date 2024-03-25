import { StyleSheet, View, Animated, Easing } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import theme from "../theme";
import { Delete } from "../icons";

type AnimatedInterpolation = ReturnType<Animated.Value["interpolate"]>;

export function LeftDeleteAction(
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

export function RightDeleteAction(
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

export const styles = StyleSheet.create({
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
