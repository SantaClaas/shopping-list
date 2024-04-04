import { router } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import { Add, QrCodeScanner } from "../icons";
import { useIsOnboarded } from "../onboarding";
import theme from "../theme";

export default function () {
  const { mutation } = useIsOnboarded();
  function handleCreate() {
    mutation.mutate(true);
    router.replace("/lists/new");
  }
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headline}>Welcome</Text>
          <Text style={styles.explainer}>
            Create a list or join one by scanning their QR-Code
          </Text>
        </View>
        <View style={styles.actions}>
          <Button
            style="filled"
            label="Create"
            icon={Add}
            onPress={handleCreate}
          />
          <Button style="outlined" label="Join" icon={QrCodeScanner} />
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
    textAlign: "center",
  },
  actions: {
    gap: 16,
    alignSelf: "stretch",
    marginBottom: 16,
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
