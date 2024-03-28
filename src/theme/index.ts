import { TextStyle } from "react-native";
// Prettier sort import attributes plugin can't handle import assertions 🥲
import color from "./color.json" /* with { type: "json" }*/;

export default {
  ...color,
  shape: {
    corner: {
      none: 0,
      extraSmall: 4,
      small: 8,
      medium: 12,
      large: 16,
      extraLarge: 28,
      full: "100%",
    },
  },
  spacing: {
    /**
     * Horizontal padding for content based on screen size
     */
    screen: {
      compact: 16,
      medium: 24,
      expanded: 24,
      large: 24,
      extraLarge: 24,
    },
  },
  typescale: {
    dispay: {},
    headline: {
      large: {
        fontWeight: "400" as const,
        fontSize: 32,
        lineHeight: 40,
        letterSpacing: 0,
      } satisfies TextStyle,
      medium: {
        // fontStyle: "regular",
        fontWeight: "400",
        fontSize: 28,
        lineHeight: 36,
        letterSpacing: 0,
      } satisfies TextStyle,
    },
    title: {
      large: {
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 22,
        letterSpacing: 0,
        lineHeight: 28,
      } satisfies TextStyle,
    },
    body: {
      large: {
        // fontStyle: "regular",
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.5,
      } satisfies TextStyle,
      medium: {
        // fontStyle: "regular",
        fontWeight: "400",
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0.25,
      } satisfies TextStyle,
    },
    label: {
      large: {
        // fontStyle: "medium",
        fontWeight: "500",
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0.1,
      } satisfies TextStyle,
    },
  },
};
