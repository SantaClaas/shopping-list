import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { and, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import { openDatabaseAsync } from "expo-sqlite/next";
import migrations from "./migrations/migrations";
import { items, lists } from "./schema";

async function initializeDatabase() {
  const expoDatabase = await openDatabaseAsync(".db");
  // Drizzle deez database
  const database = drizzle(expoDatabase);
  const result = database.run(sql`PRAGMA foreign_keys = ON;`);
  console.debug("PRAGMA result", result);

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
export type List = typeof lists.$inferSelect;
export type NewList = typeof lists.$inferInsert;
export function useLists() {
  const { data: database } = useDatabase();
  const queryKey = "lists";

  const query = useQuery({
    queryKey: [queryKey, database] as const,
    async queryFn({ queryKey: [_, database] }) {
      // Query is only enabled if the database is available
      return (await database!.select().from(lists)) satisfies List[];
    },
    enabled: !!database,
  });

  const queryClient = useQueryClient();
  const insert = useMutation({
    async mutationFn(list: NewList) {
      await database?.insert(lists).values(list);
    },
    async onMutate(newList) {
      // Optimistically update the cache
      await queryClient.cancelQueries({ queryKey: [queryKey] });

      // Snapshot the previous value
      const previousLists = queryClient.getQueryData<List[]>([queryKey]);

      // Optimistically update to the new value
      queryClient.setQueryData<List[]>([queryKey], (old) =>
        old ? [...old, newList] : [newList],
      );

      // Return a context object with the snapshotted value
      return { previousLists };
    },
    onError(_error, _newList, context) {
      // Rollback the cache update
      queryClient.setQueryData([queryKey], context?.previousLists);
      //TODO display error to user
    },
    // Don't refetch the query after success or failure
    // because this is a local database and no one else is mutating it
    // so we can easily and safely mirror the state
  });

  const deleter = useMutation({
    async mutationFn(list: List) {
      await database?.delete(lists).where(eq(lists.id, list.id));
    },
    async onMutate(deletedList) {
      // Optimistically update the cache
      await queryClient.cancelQueries({ queryKey: [queryKey] });

      // Snapshot the previous value
      const previousLists = queryClient.getQueryData<List[]>([queryKey]);

      // Optimistically update to the new value
      queryClient.setQueryData<List[]>([queryKey], (old) =>
        old?.filter((list) => list.id !== deletedList.id),
      );

      // Return a context object with the snapshotted value
      return { previousLists };
    },
    onError(_error, _deletedList, context) {
      // Rollback the cache update
      queryClient.setQueryData([queryKey], context?.previousLists);
      //TODO display error to user
    },
  });

  return { query, insert, delete: deleter };
}

export type Item = typeof items.$inferSelect;
export type NewItem = typeof items.$inferInsert;

export function useListItems(listId: string) {
  const { data: database } = useDatabase();
  const queryKey = ["lists", listId, "items"] as const;

  const query = useQuery({
    queryKey: [...queryKey, database] as const,
    async queryFn({ queryKey: [, , , database] }) {
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
  });

  return { query, insert, delete: deleter };
}
