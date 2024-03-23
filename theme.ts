import { TextStyle } from "react-native";
// /* display - large */
// --md-sys-typescale-display-large-font-family-name: Roboto;
// --md-sys-typescale-display-large-font-family-style: Regular;
// --md-sys-typescale-display-large-font-weight: 400px;
// --md-sys-typescale-display-large-font-size: 57px;
// --md-sys-typescale-display-large-line-height: 64px;
// --md-sys-typescale-display-large-letter-spacing: -0.25px;
// /* display - medium */
// --md-sys-typescale-display-medium-font-family-name: Roboto;
// --md-sys-typescale-display-medium-font-family-style: Regular;
// --md-sys-typescale-display-medium-font-weight: 400px;
// --md-sys-typescale-display-medium-font-size: 45px;
// --md-sys-typescale-display-medium-line-height: 52px;
// --md-sys-typescale-display-medium-letter-spacing: 0px;
// /* display - small */
// --md-sys-typescale-display-small-font-family-name: Roboto;
// --md-sys-typescale-display-small-font-family-style: Regular;
// --md-sys-typescale-display-small-font-weight: 400px;
// --md-sys-typescale-display-small-font-size: 36px;
// --md-sys-typescale-display-small-line-height: 44px;
// --md-sys-typescale-display-small-letter-spacing: 0px;
// /* headline - large */
// --md-sys-typescale-headline-large-font-family-name: Roboto;
// --md-sys-typescale-headline-large-font-family-style: Regular;
// --md-sys-typescale-headline-large-font-weight: 400px;
// --md-sys-typescale-headline-large-font-size: 32px;
// --md-sys-typescale-headline-large-line-height: 40px;
// --md-sys-typescale-headline-large-letter-spacing: 0px;
// /* headline - medium */
// --md-sys-typescale-headline-medium-font-family-name: Roboto;
// --md-sys-typescale-headline-medium-font-family-style: Regular;
// --md-sys-typescale-headline-medium-font-weight: 400px;
// --md-sys-typescale-headline-medium-font-size: 28px;
// --md-sys-typescale-headline-medium-line-height: 36px;
// --md-sys-typescale-headline-medium-letter-spacing: 0px;
// /* headline - small */
// --md-sys-typescale-headline-small-font-family-name: Roboto;
// --md-sys-typescale-headline-small-font-family-style: Regular;
// --md-sys-typescale-headline-small-font-weight: 400px;
// --md-sys-typescale-headline-small-font-size: 24px;
// --md-sys-typescale-headline-small-line-height: 32px;
// --md-sys-typescale-headline-small-letter-spacing: 0px;
// /* body - large */
// --md-sys-typescale-body-large-font-family-name: Roboto;
// --md-sys-typescale-body-large-font-family-style: Regular;
// --md-sys-typescale-body-large-font-weight: 400px;
// --md-sys-typescale-body-large-font-size: 16px;
// --md-sys-typescale-body-large-line-height: 24px;
// --md-sys-typescale-body-large-letter-spacing: 0.50px;
// /* body - medium */
// --md-sys-typescale-body-medium-font-family-name: Roboto;
// --md-sys-typescale-body-medium-font-family-style: Regular;
// --md-sys-typescale-body-medium-font-weight: 400px;
// --md-sys-typescale-body-medium-font-size: 14px;
// --md-sys-typescale-body-medium-line-height: 20px;
// --md-sys-typescale-body-medium-letter-spacing: 0.25px;
// /* body - small */
// --md-sys-typescale-body-small-font-family-name: Roboto;
// --md-sys-typescale-body-small-font-family-style: Regular;
// --md-sys-typescale-body-small-font-weight: 400px;
// --md-sys-typescale-body-small-font-size: 12px;
// --md-sys-typescale-body-small-line-height: 16px;
// --md-sys-typescale-body-small-letter-spacing: 0.40px;
// /* label - large */
// --md-sys-typescale-label-large-font-family-name: Roboto;
// --md-sys-typescale-label-large-font-family-style: Medium;
// --md-sys-typescale-label-large-font-weight: 500px;
// --md-sys-typescale-label-large-font-size: 14px;
// --md-sys-typescale-label-large-line-height: 20px;
// --md-sys-typescale-label-large-letter-spacing: 0.10px;
// /* label - medium */
// --md-sys-typescale-label-medium-font-family-name: Roboto;
// --md-sys-typescale-label-medium-font-family-style: Medium;
// --md-sys-typescale-label-medium-font-weight: 500px;
// --md-sys-typescale-label-medium-font-size: 12px;
// --md-sys-typescale-label-medium-line-height: 16px;
// --md-sys-typescale-label-medium-letter-spacing: 0.50px;
// /* label - small */
// --md-sys-typescale-label-small-font-family-name: Roboto;
// --md-sys-typescale-label-small-font-family-style: Medium;
// --md-sys-typescale-label-small-font-weight: 500px;
// --md-sys-typescale-label-small-font-size: 11px;
// --md-sys-typescale-label-small-line-height: 16px;
// --md-sys-typescale-label-small-letter-spacing: 0.50px;
// /* title - large */
// --md-sys-typescale-title-large-font-family-name: Roboto;
// --md-sys-typescale-title-large-font-family-style: Regular;
// --md-sys-typescale-title-large-font-weight: 400px;
// --md-sys-typescale-title-large-font-size: 22px;
// --md-sys-typescale-title-large-line-height: 28px;
// --md-sys-typescale-title-large-letter-spacing: 0px;
// /* title - medium */
// --md-sys-typescale-title-medium-font-family-name: Roboto;
// --md-sys-typescale-title-medium-font-family-style: Medium;
// --md-sys-typescale-title-medium-font-weight: 500px;
// --md-sys-typescale-title-medium-font-size: 16px;
// --md-sys-typescale-title-medium-line-height: 24px;
// --md-sys-typescale-title-medium-letter-spacing: 0.15px;
// /* title - small */
// --md-sys-typescale-title-small-font-family-name: Roboto;
// --md-sys-typescale-title-small-font-family-style: Medium;
// --md-sys-typescale-title-small-font-weight: 500px;
// --md-sys-typescale-title-small-font-size: 14px;
// --md-sys-typescale-title-small-line-height: 20px;
// --md-sys-typescale-title-small-letter-spacing: 0.10px;
export default {
  /**
   * Based on Tailwind CSS base design system mixed with previous work based on Material Design.
   * https://github.com/SantaClaas/material-tailwind/tree/main/material
   * https://github.com/tailwindlabs/tailwindcss/blob/master/src/public/colors.js
   */
  yellow: {
    50: "#fefce8",
    100: "#fef9c3",
    200: "#fef08a",
    300: "#fde047",
    400: "#facc15",
    500: "#eab308",
    600: "#ca8a04",
    700: "#a16207",
    800: "#854d0e",
    900: "#713f12",
    950: "#422006",
  },
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16",
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
    headline: {
      large: {
        fontWeight: "400" as const,
        fontSize: 32,
        lineHeight: 40,
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
