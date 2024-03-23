import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  StyleProp,
  Pressable,
} from "react-native";
import theme from "./theme";
import {
  AddShoppingCart,
  CheckBoxOutlineBlank,
  RemoveShoppingCart,
} from "./icons";
import { useState } from "react";

export type Item = {
  name: string;
};

function ListItem({ name }: Item) {
  const [isTaken, setIsTaken] = useState<boolean>(false);

  return (
    <TouchableOpacity>
      <View style={styles.item}>
        <Text style={styles.headline}>{name}</Text>
        <View style={styles.actions}>
          <Pressable onPress={() => setIsTaken(!isTaken)} style={styles.action}>
            {isTaken ? (
              <RemoveShoppingCart fill={theme.green[950]} />
            ) : (
              <AddShoppingCart fill={theme.green[950]} />
            )}
          </Pressable>

          <Pressable style={styles.action}>
            <CheckBoxOutlineBlank fill={theme.green[950]} />
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: theme.spacing.screen.compact,
    paddingVertical: 4,
    height: 56,
  },
  headline: {
    color: theme.green[950],
    ...theme.typescale.body.large,
  },
  actions: {
    flexDirection: "row",
  },
  action: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListItem;
