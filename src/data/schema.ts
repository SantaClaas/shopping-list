import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const lists = sqliteTable("lists", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
});

export const items = sqliteTable("items", {
  id: text("id").notNull().primaryKey(),
  listId: text("list_id")
    .notNull()
    .references(() => lists.id, { onDelete: "cascade", onUpdate: "cascade" }),
  /**
   * The time in seconds since the Unix epoch when the item was created.
   * In UTC to be consistent across time zones.
   * In seconds integer to work with SQLite date functions and be easily comparable.
   */
  createdTimestampUtc: integer("timestamp_created_utc", {
    // "timestamp" is seconds precision. https://github.com/drizzle-team/drizzle-orm/discussions/1007#discussioncomment-6711052
    mode: "timestamp",
  }).notNull(),
  name: text("name").notNull(),
  isChecked: integer("is_checked", { mode: "boolean" }).notNull(),
});
