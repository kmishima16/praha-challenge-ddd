import { date, pgTable, timestamp, unique, varchar } from "drizzle-orm/pg-core";

//// ------------------------------------------------------
//// Users
//// ------------------------------------------------------

// ユーザー種別のマスターデータ (例: student, admin)
export const userTypes = pgTable("user_types", {
  id: varchar("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ユーザーの在籍ステータスのマスターデータ (例: 在籍, 休会, 退会)
export const userStatus = pgTable("user_status", {
  id: varchar("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ユーザー情報
export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  userStatusId: varchar("user_status_id")
    .notNull()
    .references(() => userStatus.id),
  userTypeId: varchar("user_type_id")
    .notNull()
    .references(() => userTypes.id),
  mailAddress: varchar("mail_address", { length: 255 }).notNull().unique(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

//// ------------------------------------------------------
//// Teams
//// ------------------------------------------------------

// チーム情報
export const teams = pgTable("teams", {
  id: varchar("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// チームのメンバー所属履歴
export const teamMembershipHistories = pgTable("team_membership_histories", {
  id: varchar("id").primaryKey(),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id),
  teamId: varchar("team_id")
    .notNull()
    .references(() => teams.id),
  entryDate: date("entry_date").notNull(),
  // NULLの場合は現在も所属中
  withdrawDate: date("withdraw_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

//// ------------------------------------------------------
//// Challenges & UserTasks
//// ------------------------------------------------------

// 課題カテゴリのマスターデータ
export const challengeCategories = pgTable("challenge_categories", {
  id: varchar("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 課題のマスターデータ
export const challenges = pgTable("challenges", {
  id: varchar("id").primaryKey(),
  challengeCategoryId: varchar("challenge_category_id")
    .notNull()
    .references(() => challengeCategories.id),
  name: varchar("name", { length: 255 }).notNull().unique(),
  contentUrl: varchar("content_url", { length: 2048 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 課題進捗ステータスのマスターデータ (例: 未着手, 取組中, レビュー待ち, 完了)
export const taskStatus = pgTable("task_status", {
  id: varchar("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ユーザーごとの課題進捗
export const userTasks = pgTable(
  "user_tasks",
  {
    id: varchar("id").primaryKey(),
    userId: varchar("user_id")
      .notNull()
      .references(() => users.id),
    challengeId: varchar("challenge_id")
      .notNull()
      .references(() => challenges.id),
    taskStatusId: varchar("task_status_id")
      .notNull()
      .references(() => taskStatus.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      // user_idとchallenge_idの組み合わせでユニーク制約を設定
      userChallengeUnique: unique("user_challenge_unique").on(
        table.userId,
        table.challengeId,
      ),
    };
  },
);
