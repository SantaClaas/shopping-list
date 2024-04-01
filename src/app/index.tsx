import * as Crypto from "expo-crypto";
import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { MINIMUM_TOUCH_TARGET_SIZE } from "..";
import ListItem1 from "../components/ListItem1";
import { NewList, useLists } from "../data";
import { ArrowRight } from "../icons";
import theme from "../theme";

const DATE_FORMATTER = new Intl.DateTimeFormat(undefined, {
  timeStyle: "short",
  dateStyle: "short",
});

const UNIX_EPOCH = new Date(0);

function maxDate(a: Date, b: Date, c: Date) {
  if (a > b && a > c) return a;
  if (b > c) return b;
  return c;
}

export default function () {
  const [text, setText] = useState<TextInputProps["value"]>(undefined);
  //TODO handle error
  const { query, createList, deleteList: deleter } = useLists();

  useEffect(() => {
    if (!query.error) return;
    console.error("(TODO) Query Error", query.error);
  }, [query.error]);
  useEffect(() => {
    if (!deleter.error) return;
    console.error("(TODO) Delete Error", deleter.error);
  }, [deleter.error]);
  useEffect(() => {
    if (!createList.error) return;
    console.error("(TODO) Insert Error", createList.error);
  }, [createList.error]);

  function handleSubmit() {
    if (!text) return;

    Keyboard.dismiss();
    const now = new Date(Date.now());
    const newList: NewList = {
      id: Crypto.randomUUID(),
      name: text,
      createdUtc: now,
      lastUpdatedUtc: now,
    };
    createList.mutate(newList);
    setText(undefined);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={query.data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: list }) => {
          const lastUpdatedDate = maxDate(
            list.createdUtc,
            list.lastUpdatedUtc,
            list.itemsLastUpdatedUtc ?? UNIX_EPOCH,
          );

          const date = DATE_FORMATTER.format(lastUpdatedDate);

          // Add dot inbetween
          const lastUpdated = `, last updated ${date}`;

          const supportingText = `${list.itemsCount} ${list.itemsCount === 1 ? "item" : "items"}${lastUpdated}`;
          return (
            <Link href={`/lists/${list.id}`} asChild>
              <Pressable
                android_ripple={{
                  color: theme.state.pressed.stateLayerOpacity,
                }}
              >
                <ListItem1
                  headline={list.name}
                  supportingText={supportingText}
                  onDelete={() => deleter.mutate(list)}
                  trailingIcon={
                    <ArrowRight fill={theme.colors.light.on.surface} />
                  }
                />
              </Pressable>
            </Link>
          );
        }}
      />

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
