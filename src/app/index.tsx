import * as Crypto from "expo-crypto";
import { Link, Redirect, router } from "expo-router";
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
import FloatingActionButton from "../components/FloatingActionButton";
import ListItem1, { styles as itemStyles } from "../components/ListItem1";
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
  const [isEditing, setIsEditing] = useState(false);
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
    setIsEditing(false);
  }

  // useEffect(() => {
  //   if (!query.data) return;
  //   router.replace("/welcome");
  // }, [query.data]);

  // if (false && query.data && query.data.length === 0)
  //   return <Redirect href="/welcome" />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* The input for the new list appears as a list item */}
      {isEditing && (
        <View style={itemStyles.item}>
          <View style={itemStyles.content}>
            <TextInput
              autoFocus={true}
              placeholder="Title"
              style={[itemStyles.headline, { flex: 1 }]}
              onChangeText={setText}
              onSubmitEditing={handleSubmit}
              value={text}
            />
          </View>
          <View style={itemStyles.trailingIcons}>
            <ArrowRight fill={theme.colors.light.on.surface} />
          </View>
        </View>
      )}
      <FlatList
        data={query.data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: list }) => {
          //TODO use memo?
          const lastUpdatedDate = maxDate(
            list.createdUtc,
            list.lastUpdatedUtc,
            list.itemsLastUpdatedUtc ?? UNIX_EPOCH,
          );

          const date = DATE_FORMATTER.format(lastUpdatedDate);

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
      {isEditing || (
        <FloatingActionButton
          style="primary"
          size="large"
          onPress={() => setIsEditing(true)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
