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
  headline: string;
  supportingText: string;
};
export default function ({
  trailingIcon,
  headline,
  supportingText,
}: ListItem1Properties) {
  const paddingRight = trailingIcon ? 16 : 10; /* + 6 icon right padding */
  return (
    //TODO figure out why ripple does not work
    // Pressable needs to be outer to use Link asChild property
    // <Pressable style={styles.item} onPress={onPress} android_ripple={{}}>
    <View style={styles.item}>
      <View>
        <Text style={styles.headline}>{headline}</Text>
        <Text style={styles.supportingText}>{supportingText}</Text>
      </View>
      <View style={styles.trailingIcons}>{trailingIcon}</View>
    </View>
    // </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    height: 72,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 16,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
  },
  headline: {
    ...theme.typescale.body.large,
    color: theme.colors.light.on.surface,
  },
  supportingText: {
    ...theme.typescale.body.medium,
    color: theme.colors.light.on.surfaceVariant,
  },
  trailingIcons: {
    alignContent: "flex-end",
    justifyContent: "center",
  },
});
