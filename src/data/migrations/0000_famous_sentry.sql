CREATE TABLE `items` (
	`id` text PRIMARY KEY NOT NULL,
	`list_id` text NOT NULL,
	`name` text NOT NULL,
	`is_checked` integer NOT NULL,
	`timestamp_created_utc` integer DEFAULT (unixepoch('now')) NOT NULL,
	`last_updated_utc` integer DEFAULT (unixepoch('now')) NOT NULL,
	FOREIGN KEY (`list_id`) REFERENCES `lists`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `lists` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`created_utc` integer DEFAULT (unixepoch('now')) NOT NULL,
	`last_updated_utc` integer DEFAULT (unixepoch('now')) NOT NULL
);

-- Custom migration SQL

-- Update last updated timestamp for list if list was changed
-- List should only track its own properties and not the items
-- If we want to show when the items and/or list was last updated, we can query the items and lists table
-- On delete
CREATE TRIGGER on_delete_update_list_last_updated
AFTER DELETE ON lists
BEGIN
  UPDATE lists
  SET last_updated_utc = unixepoch()
  WHERE lists.id = NEW.id;
END;

-- On insert
CREATE TRIGGER on_insert_update_list_last_updated
AFTER INSERT ON lists
BEGIN
  UPDATE lists
  SET last_updated_utc = unixepoch()
  WHERE lists.id = NEW.id;
END;

-- On update
CREATE TRIGGER on_update_update_list_last_updated
AFTER UPDATE ON lists
BEGIN
  UPDATE lists
  SET last_updated_utc = unixepoch()
  WHERE lists.id = NEW.id;
END;



-- Update last updated timestamp for item if item was mutated
-- On delete
CREATE TRIGGER on_delete_update_item_last_updated
AFTER DELETE ON items
BEGIN
  UPDATE items
  SET last_updated_utc = unixepoch()
  WHERE items.id = NEW.id;
END;

-- On insert
CREATE TRIGGER on_insert_update_item_last_updated
AFTER INSERT ON items
BEGIN
  UPDATE items
  SET last_updated_utc = unixepoch()
  WHERE items.id = NEW.id;
END;

-- On update
CREATE TRIGGER on_update_update_item_last_updated
AFTER UPDATE ON items
BEGIN
  UPDATE items
  SET last_updated_utc = unixepoch()
  WHERE items.id = NEW.id;
END;