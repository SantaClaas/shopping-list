import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as Icons from "../icons";
import theme from "../theme";

// Limiting icons to defined icons might be overkill
type Icon = (typeof Icons)[keyof typeof Icons];
type ButtonStyle = "filled" | "outlined";
type ButtonProperties = { icon?: Icon; label: string; style: ButtonStyle };

export default function ({ icon: Icon, label, style }: ButtonProperties) {
  let buttonStyle, color;

  switch (style) {
    case "filled":
      buttonStyle = styles.filled;
      color = theme.colors.light.on.primary;
      break;
    case "outlined":
      buttonStyle = styles.outlined;
      color = theme.colors.light.primary;
      break;
  }

  return (
    <Pressable style={[styles.button, buttonStyle]}>
      {Icon && <Icon fill={color} />}

      <Text style={[styles.buttonLabel, { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingLeft: 16,
    paddingRight: 24,
    borderRadius: 100,
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  filled: {
    backgroundColor: theme.colors.light.primary,
  },
  outlined: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: theme.colors.light.outline,
  },
  buttonLabel: {
    color: theme.colors.light.on.primary,
    textAlign: "center",
    ...theme.typescale.label.large,
  },
});
