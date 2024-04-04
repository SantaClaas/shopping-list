import {
  BarcodeScanningResult,
  BarcodeSettings,
  Camera,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera/next";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button";
import theme from "../../theme";

export default function () {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission)
    return (
      <View style={styles.container}>
        <Text>not sure</Text>
      </View>
    );

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Button
          style="filled"
          label="Request Permission"
          onPress={requestPermission}
        />
      </View>
    );
  }

  function handleCodeScanned(result: BarcodeScanningResult) {
    console.debug("Scanned", result.data);
  }

  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={handleCodeScanned}
      ></CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
  },
  camera: {
    borderRadius: theme.shape.corner.large,
    aspectRatio: 3 / 4,
  },
});
