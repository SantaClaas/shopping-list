const APP_NAME = "claash-list";
/**
 * @param {import("expo/config").ConfigContext} configuration
 * @returns {import("expo/config").ExpoConfig}
 */
export default (configuration) => ({
  ...configuration,
  name: APP_NAME,
  slug: APP_NAME,
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    package: "sh.claa.list",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-camera",
      {
        cameraPermission:
          "We need camera access to scan for QR codes to join a group shopping list",
        recordAudioAndroid: false,
      },
    ],
  ],
  // The linking scheme
  scheme: APP_NAME,
  experiments: {
    typedRoutes: true,
  },
});
