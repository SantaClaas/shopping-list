import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextStyle, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import {
  default as Reanimated,
  runOnJS,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { MINIMUM_TOUCH_TARGET_SIZE } from "..";
import { Item } from "../data";
import {
  AddShoppingCart,
  CheckBox,
  CheckBoxOutlineBlank,
  RemoveShoppingCart,
} from "../icons";
import theme from "../theme";
import { LeftDeleteAction, RightDeleteAction } from "./ItemActions";

export type ListItemProperties = {
  item: Item;
  onDelete: () => void;
  isGroupList: boolean;
  isChecked: boolean;
  onCheckboxPress: () => void;
};

const ITEM_HEIGHT = 56;
function ListItem({
  item,
  onDelete,
  isGroupList,
  isChecked,
  onCheckboxPress,
}: ListItemProperties) {
  const height = useSharedValue(ITEM_HEIGHT);
  function startDeleteAnimation(callback: () => void) {
    height.value = withTiming(0, undefined, () => runOnJS(callback)());
  }

  function handleDeleteSwipe() {
    startDeleteAnimation(onDelete);
  }

  const [isTaken, setIsTaken] = useState<boolean>(false);

  // Based on https://youtu.be/JxN9W9PRlUQ
  //TODO Fade out icon when shrinking height on delete
  //TODO add haptic feedback when crossing the delete swipe threshold in the middle
  return (
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
        <Text
          style={[
            styles.headline,
            isChecked ? styles.checked : styles.unChecked,
          ]}
        >
          {item.name}
        </Text>
        <View style={styles.actions}>
          {isGroupList && (
            <Pressable
              onPress={() => setIsTaken(!isTaken)}
              style={styles.action}
            >
              {isTaken ? (
                <RemoveShoppingCart fill={theme.colors.light.on.surface} />
              ) : (
                <AddShoppingCart fill={theme.colors.light.on.surface} />
              )}
            </Pressable>
          )}

          <Pressable
            style={styles.action}
            hitSlop={12}
            onPress={onCheckboxPress}
          >
            {isChecked ? (
              <CheckBox fill={theme.colors.light.on.surface} />
            ) : (
              <CheckBoxOutlineBlank fill={theme.colors.light.on.surface} />
            )}
          </Pressable>
        </View>
      </Reanimated.View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.screen.compact,
    backgroundColor: theme.colors.light.surface,
    height: ITEM_HEIGHT,
  },
  unChecked: {},
  checked: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  headline: {
    color: theme.colors.light.on.surface,
    ...theme.typescale.body.large,
  },
  actions: {
    flexDirection: "row",
  },
  action: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListItem;
