import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import {
  default as Reanimated,
  runOnJS,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Item } from "../data";
import {
  AddShoppingCart,
  CheckBoxOutlineBlank,
  RemoveShoppingCart,
} from "../icons";
import theme from "../theme";
import { LeftDeleteAction, RightDeleteAction, styles } from "./ItemActions";

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
                <RemoveShoppingCart fill={theme.colors.light.on.surface} />
              ) : (
                <AddShoppingCart fill={theme.colors.light.on.surface} />
              )}
            </Pressable>
          )}

          <Pressable style={styles.action}>
            <CheckBoxOutlineBlank fill={theme.colors.light.on.surface} />
          </Pressable>
        </View>
      </Reanimated.View>
    </Swipeable>
  );
}

export default ListItem;
