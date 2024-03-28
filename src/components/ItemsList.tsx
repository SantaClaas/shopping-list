import * as Crypto from "expo-crypto";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar as RnStatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MINIMUM_TOUCH_TARGET_SIZE } from "..";
import { Item, useItems } from "../data";
import theme from "../theme";
import ListItem from "./ListItem";

export default () => {
  console.debug("Render");
  // Rerenders on type now but this might be useful later to show suggestions
  const [text, setText] = useState<string | undefined>(undefined);

  //TODO handle error
  const { query, insert, delete: deleter } = useItems();
  const { data } = query;

  console.debug(query.isError, query.data?.length, insert.error);

  function handleSubmit() {
    if (!text) return;

    Keyboard.dismiss();
    const newItem = {
      id: Crypto.randomUUID(),
      listId: "this should cause foreign key error",
      name: text,
      isChecked: false,
      // This is UTC in seconds isn't it?
      createdTimestampUtc: new Date(Date.now()),
    };
    insert.mutate(newItem);
    setText(undefined);
  }

  //TODO drag items to change order
  return (
    <SafeAreaView style={styles.page}>
      <View>
        <StatusBar style="auto" backgroundColor={theme.colors.light.surface} />
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ListItem
              item={item}
              onDelete={() => deleter.mutate(item)}
              isGroupList={false}
            />
          )}
          keyExtractor={(item) => item.name}
        />
      </View>
      <KeyboardAvoidingView
        style={styles.newItemArea}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TextInput
          style={styles.input}
          onChangeText={setText}
          onSubmitEditing={handleSubmit}
          value={text}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: theme.colors.light.surface,
    marginTop: RnStatusBar.currentHeight || 0,
  },
  title: {
    // fontSize: theme.typescale.headline.large.fontSize,
    // fontWeight: theme.typescale.headline.large.fontWeight,
    ...theme.typescale.headline.large,
    color: theme.colors.light.on.surface,
    paddingHorizontal: theme.spacing.screen.compact,
  },
  itemList: {
    paddingVertical: 8,
  },
  newItemArea: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    flex: 1,
    gap: 10,
    flexDirection: "row",
    paddingHorizontal: theme.spacing.screen.compact,
  },
  input: {
    // backgroundColor: theme.yellow[100],
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: theme.colors.light.primary,
    height: MINIMUM_TOUCH_TARGET_SIZE.height,
    flex: 1,
    padding: 10,
  },
  addButton: {
    backgroundColor: theme.colors.light.primary,
    borderRadius: 5,
    height: MINIMUM_TOUCH_TARGET_SIZE.height,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: theme.colors.light.on.primary,
    ...theme.typescale.label.large,
  },
});
