import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const unixepoch = sql`(unixepoch('now'))`;
export const lists = sqliteTable("lists", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  createdUtc: integer("created_utc", {
    mode: "timestamp",
  })
    .notNull()
    .default(unixepoch),
  lastUpdatedUtc: integer("last_updated_utc", {
    mode: "timestamp",
  })
    .notNull()
    .default(unixepoch),
});

export const items = sqliteTable("items", {
  id: text("id").notNull().primaryKey(),
  listId: text("list_id")
    .notNull()
    .references(() => lists.id, { onDelete: "cascade", onUpdate: "cascade" }),

  name: text("name").notNull(),
  isChecked: integer("is_checked", { mode: "boolean" }).notNull(),
  /**
   * The time in seconds since the Unix epoch when the item was created.
   * In UTC to be consistent across time zones.
   * In seconds integer to work with SQLite date functions and be easily comparable.
   */
  createdUtc: integer("timestamp_created_utc", {
    // "timestamp" is seconds precision. https://github.com/drizzle-team/drizzle-orm/discussions/1007#discussioncomment-6711052
    mode: "timestamp",
  })
    .notNull()
    .default(unixepoch),
  lastUpdatedUtc: integer("last_updated_utc", {
    mode: "timestamp",
  })
    .notNull()
    .default(unixepoch),
});

export const itemsRelations = relations(items, ({ one }) => ({
  list: one(lists, {
    fields: [items.listId],
    references: [lists.id],
  }),
}));
