import { Text, View, Pressable } from "react-native";
import { useState } from "react";
import { Swipeable } from "react-native-gesture-handler";
import {
  default as Reanimated,
  runOnJS,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import theme from "../theme";
import {
  AddShoppingCart,
  CheckBoxOutlineBlank,
  RemoveShoppingCart,
} from "../icons";
import { LeftDeleteAction, RightDeleteAction, styles } from "./ItemActions";
import { Item } from "../data";

export type ListItemProperties = {
  item: Item;
  onDelete: () => void;
  isGroupList: boolean;
};

function ListItem({ item, onDelete, isGroupList }: ListItemProperties) {
  const height = useSharedValue(56);
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
        <Text style={styles.headline}>{item.name}</Text>
        <View style={styles.actions}>
          {isGroupList && (
            <Pressable
              onPress={() => setIsTaken(!isTaken)}
              style={styles.action}
            >
              {isTaken ? (
                <RemoveShoppingCart fill={theme.green[950]} />
              ) : (
                <AddShoppingCart fill={theme.green[950]} />
              )}
            </Pressable>
          )}

          <Pressable style={styles.action}>
            <CheckBoxOutlineBlank fill={theme.green[950]} />
          </Pressable>
        </View>
      </Reanimated.View>
    </Swipeable>
  );
}

export default ListItem;
