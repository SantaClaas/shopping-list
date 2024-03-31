import * as Crypto from "expo-crypto";
import { useLocalSearchParams, useNavigation } from "expo-router";
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
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { MINIMUM_TOUCH_TARGET_SIZE } from "../..";
import ListItem from "../../components/ListItem";
import { Item, NewItem, useList, useListItems } from "../../data";
import theme from "../../theme";

export default () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  // Rerenders on type now but this might be useful later to show suggestions
  const [text, setText] = useState<TextInputProps["value"]>(undefined);

  const { data: list, error } = useList(id);
  //TODO handle error
  const { query, insert, delete: deleter } = useListItems(id);
  const { data } = query;

  useEffect(() => {
    if (!query.error) return;
    console.error("(TODO) Query Error", query.error);
  }, [query.error]);
  useEffect(() => {
    if (!deleter.error) return;
    console.error("(TODO) Delete Error", deleter.error);
  }, [deleter.error]);
  useEffect(() => {
    if (!insert.error) return;
    console.error("(TODO) Insert Error", insert.error);
  }, [insert.error]);

  const navigation = useNavigation();
  // Set list name as header title
  useEffect(() => {
    if (!list) return;

    const name = list.name;
    navigation.setOptions({ headerTitle: name });
  }, [navigation, list, error]);

  function handleSubmit() {
    if (!text) return;

    Keyboard.dismiss();
    const now = new Date(Date.now());
    const newItem: NewItem = {
      id: Crypto.randomUUID(),
      listId: id,
      name: text,
      isChecked: false,
      // This is UTC in seconds isn't it?
      createdUtc: now,
      lastUpdatedUtc: now,
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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListItem
              item={item}
              onDelete={() => deleter.mutate(item)}
              isGroupList={false}
            />
          )}
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
