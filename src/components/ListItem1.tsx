// List item with one lines of supporting text

import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MINIMUM_TOUCH_TARGET_SIZE } from "..";
import theme from "../theme";

export type ListItem1Properties = {
  trailingIcon?: React.ReactNode;

  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
};
export default function ({ trailingIcon, onPress }: ListItem1Properties) {
  const paddingRight = trailingIcon ? 16 : 10; /* + 6 icon right padding */
  return (
    //TODO figure out why ripple does not work
    // Pressable needs to be outer to use Link asChild property
    // <Pressable style={styles.item} onPress={onPress} android_ripple={{}}>
    <View style={styles.item}>
      <View>
        <Text style={styles.headline}>Item 1</Text>
        <Text style={styles.supportingText}>Supporting text</Text>
      </View>
      <View style={styles.trailingIcons}>
        {trailingIcon && <Pressable>{trailingIcon}</Pressable>}
      </View>
    </View>
    // </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    height: 72,
    paddingVertical: 8,
    paddingLeft: 16,
    paddingRight: 24,
    gap: 10 /* + 6 icon left padding */,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
  },
  headline: {
    ...theme.typescale.body.large,
  },
  supportingText: {
    ...theme.typescale.body.medium,
  },
  trailingIcons: {
    alignContent: "flex-end",
  },
  trailingIcon: {
    ...MINIMUM_TOUCH_TARGET_SIZE,
    padding: 12,
  },
});
