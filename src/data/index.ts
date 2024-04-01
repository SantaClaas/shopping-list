import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { and, count, eq, max, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import { deleteDatabaseAsync, openDatabaseAsync } from "expo-sqlite/next";
import { useEffect } from "react";
import migrations from "./migrations/migrations";
import { items, lists } from "./schema";
import * as schema from "./schema";

async function initializeDatabase() {
  // if (__DEV__) await deleteDatabaseAsync(".db");r

  const expoDatabase = await openDatabaseAsync(".db");
  // Drizzle deez database

  const database = drizzle(expoDatabase, { schema, logger: __DEV__ });
  database.run(sql`PRAGMA foreign_keys = ON;`);

  await migrate(database, migrations);
  return database;
}

function useDatabase() {
  return useQuery({
    queryKey: ["database"],
    queryFn: initializeDatabase,
    // The database lives for the lifetime of the app
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
export type List = typeof lists.$inferSelect & {
  itemsCount: number;
  // Can be null if there are no items
  itemsLastUpdatedUtc: Date | null;
};

export type NewList = Required<typeof lists.$inferInsert>;
const LISTS_KEY = ["lists"] as const;
export function useLists() {
  const { data: database, error } = useDatabase();

  useEffect(() => {
    if (!error) return;
    console.error("(TODO) Database Error", error);
  }, [error]);
  const query = useQuery({
    queryKey: LISTS_KEY,
    async queryFn() {
      // Query is only enabled if the database is available
      return (
        (await database!
          .select({
            id: lists.id,
            name: lists.name,
            lastUpdatedUtc: lists.lastUpdatedUtc,
            createdUtc: lists.createdUtc,
            itemsCount: count(items.id),
            itemsLastUpdatedUtc: max(items.lastUpdatedUtc),
          })
          .from(lists)
          .leftJoin(items, eq(lists.id, items.listId))
          // Group by is required, otherwise we get a row with everything set to null except the count which is 0
          .groupBy(items.id)) satisfies List[]
      );
    },
    // This makes the query run as soon as the database is available
    enabled: !!database,
  });

  const queryClient = useQueryClient();
  const createList = useMutation({
    async mutationFn(list: NewList) {
      await database?.insert(lists).values(list);
    },
    async onMutate(newList) {
      // Optimistically update the cache
      await queryClient.cancelQueries({ queryKey: LISTS_KEY });

      // Snapshot the previous value
      const previousLists = queryClient.getQueryData<List[]>(LISTS_KEY);

      // Optimistically update to the new value
      queryClient.setQueryData<List[]>(LISTS_KEY, (old) => {
        const list = {
          ...newList,
          itemsCount: 0,
          itemsLastUpdatedUtc: null,
        };

        return old ? [...old, list] : [list];
      });

      // Return a context object with the snapshotted value
      return { previousLists };
    },
    onError(_error, _newList, context) {
      // Rollback the cache update
      queryClient.setQueryData(LISTS_KEY, context?.previousLists);
      //TODO display error to user
    },
    // Don't refetch the query after success or failure
    // because this is a local database and no one else is mutating it
    // so we can easily and safely mirror the state
  });

  const deleteList = useMutation({
    async mutationFn(list: List) {
      await database?.delete(lists).where(eq(lists.id, list.id));
    },
    async onMutate(deletedList) {
      // Optimistically update the cache
      await queryClient.cancelQueries({ queryKey: LISTS_KEY });

      // Snapshot the previous value
      const previousLists = queryClient.getQueryData<List[]>(LISTS_KEY);

      // Optimistically update to the new value
      queryClient.setQueryData<List[]>(LISTS_KEY, (old) =>
        old?.filter((list) => list.id !== deletedList.id),
      );

      // Return a context object with the snapshotted value
      return { previousLists };
    },
    onError(_error, _deletedList, context) {
      // Rollback the cache update
      queryClient.setQueryData([LISTS_KEY], context?.previousLists);
      //TODO display error to user
    },
  });

  return { query, createList, deleteList };
}

export type Item = typeof items.$inferSelect;
// Require all fields as defaults for types are just used as fallback and values should be set from application code
export type NewItem = Required<typeof items.$inferInsert>;

export function useList(id: string) {
  const { data: database } = useDatabase();
  const queryKey = ["lists", id] as const;

  const query = useQuery({
    queryKey: queryKey,
    async queryFn({ queryKey: [, listId] }) {
      return await database!.query.lists.findFirst({
        where: (lists, { eq }) => eq(lists.id, listId),
      });
    },
    enabled: !!database,
  });

  return query;
}

export function useListItems(listId: string) {
  const { data: database } = useDatabase();
  const queryKey = ["lists", listId, "items"] as const;

  const query = useQuery({
    queryKey: queryKey,
    async queryFn({ queryKey: [, listId] }) {
      // Query is only enabled if the database is available
      return (await database!
        .select()
        .from(items)
        .where(eq(items.listId, listId))) satisfies Item[];
    },
    enabled: !!database,
  });

  const queryClient = useQueryClient();
  const insert = useMutation({
    async mutationFn(item: NewItem) {
      await database?.insert(items).values(item);
    },
    async onMutate(newItem) {
      // Optimistically update the cache
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value
      const previousItems = queryClient.getQueryData<Item[]>(queryKey);

      // Optimistically update to the new value
      queryClient.setQueryData<Item[]>(queryKey, (old) =>
        old ? [...old, newItem] : [newItem],
      );

      // Return a context object with the snapshotted value
      return { previousItems };
    },
    onError(_error, _newItem, context) {
      // Rollback the cache update
      queryClient.setQueryData(queryKey, context?.previousItems);
      //TODO display error to user
    },
    // Don't refetch the query after success or failure
    // because this is a local database and no one else is mutating it
    // so we can easily and safely mirror the state
    onSuccess() {
      // Invalidate the list query to refetch last updated and items count
      queryClient.invalidateQueries({ queryKey: [LISTS_KEY] });
    },
  });

  const deleter = useMutation({
    async mutationFn(item: Item) {
      await database
        ?.delete(items)
        .where(and(eq(items.id, item.id), eq(items.listId, listId)));
    },
    async onMutate(deletedItem) {
      // Optimistically update the cache
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value
      const previousItems = queryClient.getQueryData<Item[]>(queryKey);

      // Optimistically update to the new value
      queryClient.setQueryData<Item[]>(queryKey, (old) =>
        old?.filter((item) => item.id !== deletedItem.id),
      );

      // Return a context object with the snapshotted value
      return { previousItems };
    },
    onError(_error, _deletedItem, context) {
      // Rollback the cache update
      queryClient.setQueryData(queryKey, context?.previousItems);
      //TODO display error to user
    },
    onSuccess() {
      // Invalidate the list query to refetch last updated and items count
      queryClient.invalidateQueries({ queryKey: [LISTS_KEY] });
    },
  });

  return { query, insert, delete: deleter };
}
