import { View, Text, StyleSheet } from "react-native";
import theme from "../theme";

function TopAppBar() {
  return (
    <View style={styles.appBar}>
      <Text style={styles.headline}>Shopping List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  appBar: {
    height: 152,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 28,
    width: "100%",
    justifyContent: "flex-end",
  },
  headline: {
    color: theme.green[950],
    ...theme.typescale.headline.medium,
  },
});

export default TopAppBar;
