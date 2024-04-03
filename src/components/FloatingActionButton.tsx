import { Pressable, PressableProps, StyleSheet } from "react-native";
import { Add } from "../icons";
import theme from "../theme";

type FloatingActionButtonStyle = "primary";
type FloatingActionButtonProperties = {
  style: FloatingActionButtonStyle;
  size?: "default" | "large";
  onPress?: PressableProps["onPress"];
};
export default function ({
  style,
  size,
  onPress,
}: FloatingActionButtonProperties) {
  let buttonStyle, color;
  switch (style) {
    case "primary":
      buttonStyle = styles.primary;
      color = theme.colors.light.on.primaryContainer;
      break;
  }

  let layout, iconSize;
  switch (size) {
    case "large":
      layout = styles.large;
      iconSize = 36;
      break;
    default:
      layout = styles.default;
      iconSize = 24;
      break;
  }

  return (
    <Pressable
      onPress={onPress}
      style={[styles.floatingActionButton, buttonStyle, layout]}
    >
      <Add fill={color} height={iconSize} width={iconSize} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  floatingActionButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    alignItems: "center",
    justifyContent: "center",
    ...theme.elevation.light.level3,
  },
  primary: {
    backgroundColor: theme.colors.light.primaryContainer,
  },
  default: {
    borderRadius: theme.shape.corner.large,
    height: 56,
    width: 56,
  },
  large: {
    borderRadius: theme.shape.corner.extraLarge,
    height: 96,
    width: 96,
  },
});
