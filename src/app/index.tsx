import * as Crypto from "expo-crypto";
import { Link } from "expo-router";
import { useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { MINIMUM_TOUCH_TARGET_SIZE } from "..";
import ListItem1 from "../components/ListItem1";
import { useLists } from "../data";
import { ArrowRight } from "../icons";
import theme from "../theme";

export default function () {
  const [text, setText] = useState<string | undefined>(undefined);
  //TODO handle error
  const { query, insert, delete: deleter } = useLists();
  function handleSubmit() {
    if (!text) return;

    Keyboard.dismiss();
    const newList = {
      id: Crypto.randomUUID(),
      name: text,
    };
    insert.mutate(newList);
    setText(undefined);
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={query.data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/lists/${item.id}`} asChild>
            <Pressable
              android_ripple={{
                color: theme.state.pressed.stateLayerOpacity,
              }}
            >
              <ListItem1
                headline={item.name}
                supportingText={"More list information coming soon"}
                trailingIcon={
                  <ArrowRight fill={theme.colors.light.on.surface} />
                }
              />
            </Pressable>
          </Link>
        )}
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
