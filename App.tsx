import { StatusBar } from "expo-status-bar";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Keyboard,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";
import theme from "./theme";
import type { Item } from "./Item";
import ListItem from "./Item";

const testItems: Item[] = [
  { name: "Apples" },
  { name: "Bananas" },
  { name: "Oranges" },
];

export default function App() {
  const [items, setItems] = useState<Item[]>(__DEV__ ? testItems : []);
  const [text, setText] = useState<string | undefined>(undefined);

  function handleSubmit() {
    if (!text) return;

    Keyboard.dismiss();
    const newItem = { name: text };
    items.push(newItem);
    setItems(items);
    console.debug("items", items);
    setText(undefined);
  }

  return (
    <SafeAreaView style={styles.page}>
      <View>
        <StatusBar style="auto" />
        <Text style={styles.title}>Shopping List</Text>
        <View style={styles.itemList}>
          {items.map((item, index) => (
            <ListItem key={index} name={item.name} />
          ))}
        </View>
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
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: theme.yellow[50],
  },
  title: {
    // fontSize: theme.typescale.headline.large.fontSize,
    // fontWeight: theme.typescale.headline.large.fontWeight,
    ...theme.typescale.headline.large,
    color: theme.green[900],
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
    borderColor: theme.green[800],
    height: 48,
    flex: 1,
    padding: 10,
  },
  addButton: {
    backgroundColor: theme.green[700],
    borderRadius: 5,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: theme.yellow[50],
    ...theme.typescale.label.large,
  },
});
