import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
  id: varchar("id").notNull().primaryKey(),
  title: varchar("title").notNull(),
  done: boolean("done").notNull(),
});
