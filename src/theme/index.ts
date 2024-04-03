import { Platform, TextStyle, ViewStyle } from "react-native";
// Prettier sort import attributes plugin can't handle import assertions 🥲
import color from "./color.json" /* with { type: "json" }*/;

export default {
  ...color,
  //   --md-sys-elevation-light-level-1-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15),
  //   0px 1px 2px 0px rgba(0, 0, 0, 0.3);
  // --md-sys-elevation-light-level-2-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15),
  //   0px 1px 2px 0px rgba(0, 0, 0, 0.3);
  // --md-sys-elevation-light-level-3-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3),
  //   0px 4px 8px 3px rgba(0, 0, 0, 0.15);
  // --md-sys-elevation-light-level-4-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3),
  //   0px 6px 10px 4px rgba(0, 0, 0, 0.15);
  // --md-sys-elevation-light-level-5-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.3),
  //   0px 8px 12px 6px rgba(0, 0, 0, 0.15);
  elevation: {
    light: {
      level0: {
        // shadow: none
        elevation: 0,
        zIndex: 0,
      } satisfies ViewStyle,
      level1: {
        shadowColor: color.colors.light.shadow,
        zIndex: 1,

        // iOS
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowRadius: 3,
        shadowOpacity: 0.15,
        // spreadRadius: 1,

        // Android
        elevation: 1,
      } satisfies ViewStyle,
      level2: {
        shadowColor: color.colors.light.shadow,
        zIndex: 3,

        // iOS
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 6,
        shadowOpacity: 0.15,
        // spreadRadius: 2,

        // Android
        elevation: 3,
      } satisfies ViewStyle,
      level3: {
        shadowColor: color.colors.light.shadow,
        zIndex: 6,

        // iOS
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowRadius: 3,
        shadowOpacity: 0.15,
        // spreadRadius: 0,

        // Android
        elevation: 6,
      } satisfies ViewStyle,
      level4: {
        shadowColor: color.colors.light.shadow,
        zIndex: 8,

        // Android
        elevation: 8,
      } satisfies ViewStyle,
      level5: {
        shadowColor: color.colors.light.shadow,
        zIndex: 12,

        // Android
        elevation: 12,
      } satisfies ViewStyle,
    },
    dark: {
      level0: {
        shadowColor: color.colors.dark.shadow,
        elevation: 0,
        zIndex: 0,
      } satisfies ViewStyle,
      level1: {
        shadowColor: color.colors.dark.shadow,
        elevation: 1,
        zIndex: 1,
      } satisfies ViewStyle,
      level2: {
        shadowColor: color.colors.dark.shadow,
        elevation: 3,
        zIndex: 3,
      } satisfies ViewStyle,
      level3: {
        shadowColor: color.colors.dark.shadow,
        elevation: 6,
        zIndex: 6,
      } satisfies ViewStyle,
      level4: {
        shadowColor: color.colors.dark.shadow,
        elevation: 8,
        zIndex: 8,
      } satisfies ViewStyle,
      level5: {
        shadowColor: color.colors.dark.shadow,
        elevation: 12,
        zIndex: 12,
      } satisfies ViewStyle,
    },
  },
  shape: {
    corner: {
      none: 0,
      extraSmall: 4,
      small: 8,
      medium: 12,
      large: 16,
      extraLarge: 28,
      full: "100%",
    } as const,
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
  state: {
    hovered: {
      /** As hex rgba of black with 8% opacity value since pressable only accepts a color value */
      stateLayerOpacity: "#00000014",
    },
    focused: {
      /** As hex rgba of black with 10% opacity value since pressable only accepts a color value */
      stateLayerOpacity: "#0000001a",
    },
    pressed: {
      /**
       * The color of the ripple effect when the component is pressed
       * As hex rgba of black with 10% opacity value since pressable only accepts a color value
       */
      stateLayerOpacity: "#0000001a",
    },
    dragged: {
      /** As hex rgba of black with 16% opacity value since pressable only accepts a color value */
      stateLayerOpacity: "#00000029",
    },
  },
  typescale: {
    dispay: {
      large: {
        // fontFamily: "Roboto",
        // fontStyle: "regular",
        fontWeight: "400",
        fontSize: 57,
        lineHeight: 64,
        letterSpacing: -0.25,
      } satisfies TextStyle,
      medium: {
        // fontFamily: "Roboto",
        // fontStyle: "regular",
        fontWeight: "400",
        fontSize: 45,
        lineHeight: 52,
        letterSpacing: 0,
      } satisfies TextStyle,
      small: {
        // fontFamily: "Roboto",
        // fontStyle: "regular",
        fontWeight: "400",
        fontSize: 36,
        lineHeight: 44,
        letterSpacing: 0,
      } satisfies TextStyle,
    },
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
