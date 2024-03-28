import { getHeaderTitle } from "@react-navigation/elements";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { MINIMUM_TOUCH_TARGET_SIZE } from "../..";
import { ArrowBack } from "../../icons";
import theme from "../../theme";

export default function (properties: NativeStackHeaderProps) {
  const insets = useSafeAreaInsets();
  const title = getHeaderTitle(properties.options, properties.route.name);
  const isLeadingIconShown = properties.navigation.canGoBack();

  //TODO integrate iOS native back button
  // For reference material large top app bar component & https://m3.material.io/styles/motion/transitions/transition-patterns#0673be6b-e8d0-4417-ac28-a3a5e621276a
  return (
    // Safe Area
    <View
      style={{
        paddingTop: insets.top,
        backgroundColor: theme.colors.light.surface,
      }}
    >
      <View style={styles.appBar}>
        <View style={[styles.topRow]}>
          {isLeadingIconShown && (
            <Pressable
              style={styles.icon}
              onPress={properties.navigation.goBack}
              android_ripple={{ radius: 24 / 2 + 8 }}
            >
              <ArrowBack fill={theme.colors.light.on.surface} />
            </Pressable>
          )}

          <View style={styles.trailingIcons}>
            {/* <Pressable style={styles.icon}>
              <ArrowBack fill={theme.green[950]} />
            </Pressable>
            <Pressable style={styles.icon}>
              <ArrowBack fill={theme.green[950]} />
            </Pressable>
            <Pressable style={styles.icon}>
              <ArrowBack fill={theme.green[950]} />
            </Pressable> */}
          </View>
        </View>

        <Text style={styles.headline}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appBar: {
    height: 152,
    paddingBottom: 28,
    width: "100%",
    gap: 40,
    backgroundColor: theme.colors.light.surface,
  },
  topRow: {
    paddingTop: 8,
    paddingHorizontal: 4,
    flexDirection: "row",
    height: MINIMUM_TOUCH_TARGET_SIZE.height,
  },
  icon: {
    ...MINIMUM_TOUCH_TARGET_SIZE,
    padding: 12,
  },
  trailingIcons: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
  },
  headline: {
    color: theme.colors.light.on.surface,
    paddingHorizontal: 16,
    ...theme.typescale.headline.medium,
  },
});
