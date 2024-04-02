import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { Add, QrCodeScanner } from "../icons";
import theme from "../theme";

export default function () {
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headline}>Welcome</Text>
          <Text style={styles.explainer}>
            Create a list or join one by scanning a QR-Code
          </Text>
        </View>
        <View style={styles.actions}>
          <Pressable style={styles.button}>
            <Add fill={theme.colors.light.on.primary} />
            <Text style={styles.buttonLabel}>Create</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <QrCodeScanner fill={theme.colors.light.on.primary} />
            <Text style={styles.buttonLabel}>Join</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: theme.spacing.screen.compact,
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
  },
  headline: {
    ...theme.typescale.dispay.large,
    color: theme.colors.light.on.surface,
    marginTop: 152,
  },
  explainer: {
    ...theme.typescale.body.large,
    color: theme.colors.light.on.surface,
    marginTop: 16,
  },
  actions: {
    gap: 16,
    alignSelf: "stretch",
  },
  button: {
    backgroundColor: theme.colors.light.primary,
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
  buttonLabel: {
    color: theme.colors.light.on.primary,
    textAlign: "center",
    ...theme.typescale.label.large,
  },
});
