// List item with one lines of supporting text

import { StyleSheet, Text, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import {
  default as Reanimated,
  runOnJS,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import theme from "../theme";
import { LeftDeleteAction, RightDeleteAction } from "./ItemActions";

export type ListItem1Properties = {
  trailingIcon?: React.ReactNode;
  headline: string;
  supportingText: string;
  onDelete: () => void;
};

const ITEM_HEIGHT = 72;
export default function ({
  trailingIcon,
  headline,
  supportingText,
  onDelete,
}: ListItem1Properties) {
  const height = useSharedValue(ITEM_HEIGHT);
  function startDeleteAnimation(callback: () => void) {
    height.value = withTiming(0, undefined, () => runOnJS(callback)());
  }

  function handleDeleteSwipe() {
    startDeleteAnimation(onDelete);
  }

  return (
    //TODO figure out why ripple does not work
    // Pressable needs to be outer to use Link asChild property
    // <Pressable style={styles.item} onPress={onPress} android_ripple={{}}>
    <Swipeable
      renderLeftActions={LeftDeleteAction}
      renderRightActions={RightDeleteAction}
      onSwipeableOpen={handleDeleteSwipe}
    >
      <Reanimated.View
        style={[
          styles.item,
          {
            height,
          },
        ]}
      >
        <View style={styles.content}>
          <Text style={styles.headline}>{headline}</Text>
          <Text style={styles.supportingText}>{supportingText}</Text>
        </View>
        <View style={styles.trailingIcons}>{trailingIcon}</View>
      </Reanimated.View>
    </Swipeable>
    // </Pressable>
  );
}

export const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    height: ITEM_HEIGHT,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 16,
    justifyContent: "space-between",
    backgroundColor: theme.colors.light.surface,
  },
  content: { flex: 1 },
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
