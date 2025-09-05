import { relations } from "drizzle-orm";
import {
  date,
  pgTable,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

//// ------------------------------------------------------
//// Users
//// ------------------------------------------------------

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  userStatusId: varchar("user_status_id")
    .notNull()
    .references(() => userStatus.id),
  emailAddress: varchar("email_address", { length: 255 }).notNull().unique(),
  userType: varchar("user_type", { length: 50 }).notNull(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userStatus = pgTable("user_status", {
  id: varchar("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userStatusHistories = pgTable("user_status_histories", {
  id: varchar("id").primaryKey(),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id),
  userStatusId: varchar("user_status_id")
    .notNull()
    .references(() => userStatus.id),
  changedAt: timestamp("changed_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

//// ------------------------------------------------------
//// Teams
//// ------------------------------------------------------

export const teams = pgTable("teams", {
  id: varchar("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const teamMemberships = pgTable("team_memberships", {
  id: varchar("id").primaryKey(),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id),
  teamId: varchar("team_id")
    .notNull()
    .references(() => teams.id),
  startDate: date("start_date").notNull(),
  endDate: date("end_date"), // NULLの場合、現在も所属中
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

//// ------------------------------------------------------
//// Tasks & Progress
//// ------------------------------------------------------

export const tasks = pgTable("tasks", {
  id: varchar("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  contentUrl: varchar("content_url", { length: 2048 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const taskProgress = pgTable("task_progress", {
  id: varchar("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const assignments = pgTable(
  "assignments",
  {
    id: varchar("id").primaryKey(),
    userId: varchar("user_id")
      .notNull()
      .references(() => users.id),
    taskId: varchar("task_id")
      .notNull()
      .references(() => tasks.id),
    taskProgressId: varchar("task_progress_id")
      .notNull()
      .references(() => taskProgress.id),
    updatedAt: timestamp("updated_at").notNull(),
  },
  (table) => [unique("unique_user_task").on(table.userId, table.taskId)],
);

export const assignmentStatusHistories = pgTable(
  "assignment_status_histories",
  {
    id: varchar("id").primaryKey(),
    assignmentId: varchar("assignment_id")
      .notNull()
      .references(() => assignments.id),
    taskProgressId: varchar("task_progress_id")
      .notNull()
      .references(() => taskProgress.id),
    createdAt: timestamp("created_at").notNull(),
  },
);

// --- Relations ---

export const usersRelations = relations(users, ({ one, many }) => ({
  userStatus: one(userStatus, {
    fields: [users.userStatusId],
    references: [userStatus.id],
  }),
  userStatusHistories: many(userStatusHistories),
  teamMemberships: many(teamMemberships),
  assignments: many(assignments),
}));

export const userStatusRelations = relations(userStatus, ({ many }) => ({
  users: many(users),
  userStatusHistories: many(userStatusHistories),
}));

export const userStatusHistoriesRelations = relations(
  userStatusHistories,
  ({ one }) => ({
    user: one(users, {
      fields: [userStatusHistories.userId],
      references: [users.id],
    }),
    userStatus: one(userStatus, {
      fields: [userStatusHistories.userStatusId],
      references: [userStatus.id],
    }),
  }),
);

export const teamsRelations = relations(teams, ({ many }) => ({
  teamMemberships: many(teamMemberships),
}));

export const teamMembershipRelations = relations(teamMemberships, ({ one }) => ({
  user: one(users, {
    fields: [teamMemberships.userId],
    references: [users.id],
  }),
  team: one(teams, {
    fields: [teamMemberships.teamId],
    references: [teams.id],
  }),
}));

export const tasksRelations = relations(tasks, ({ many }) => ({
  assignments: many(assignments),
}));

export const taskProgressRelations = relations(taskProgress, ({ many }) => ({
  assignments: many(assignments),
  assignmentStatusHistories: many(assignmentStatusHistories),
}));

export const assignmentsRelations = relations(assignments, ({ one, many }) => ({
  user: one(users, {
    fields: [assignments.userId],
    references: [users.id],
  }),
  task: one(tasks, {
    fields: [assignments.taskId],
    references: [tasks.id],
  }),
  taskProgress: one(taskProgress, {
    fields: [assignments.taskProgressId],
    references: [taskProgress.id],
  }),
  assignmentStatusHistories: many(assignmentStatusHistories),
}));

export const assignmentStatusHistoriesRelations = relations(
  assignmentStatusHistories,
  ({ one }) => ({
    assignment: one(assignments, {
      fields: [assignmentStatusHistories.assignmentId],
      references: [assignments.id],
    }),
    taskProgress: one(taskProgress, {
      fields: [assignmentStatusHistories.taskProgressId],
      references: [taskProgress.id],
    }),
  }),
);
