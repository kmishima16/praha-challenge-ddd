CREATE TABLE "challenge_categories" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "challenge_categories_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "user_types" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_types_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "task_status_histories" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "user_status_histories" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "task_status_histories" CASCADE;--> statement-breakpoint
DROP TABLE "user_status_histories" CASCADE;--> statement-breakpoint
ALTER TABLE "assignments" RENAME TO "challenges";--> statement-breakpoint
ALTER TABLE "task_progress" RENAME TO "task_status";--> statement-breakpoint
ALTER TABLE "team_memberships" RENAME TO "team_membership_histories";--> statement-breakpoint
ALTER TABLE "tasks" RENAME TO "user_tasks";--> statement-breakpoint
ALTER TABLE "user_tasks" RENAME COLUMN "assignment_id" TO "challenge_id";--> statement-breakpoint
ALTER TABLE "user_tasks" RENAME COLUMN "task_progress_id" TO "task_status_id";--> statement-breakpoint
ALTER TABLE "team_membership_histories" RENAME COLUMN "start_date" TO "entry_date";--> statement-breakpoint
ALTER TABLE "team_membership_histories" RENAME COLUMN "end_date" TO "withdraw_date";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "email_address" TO "mail_address";--> statement-breakpoint
ALTER TABLE "task_status" DROP CONSTRAINT "task_progress_name_unique";--> statement-breakpoint
ALTER TABLE "user_tasks" DROP CONSTRAINT "unique_user_assignment";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_email_address_unique";--> statement-breakpoint
ALTER TABLE "user_tasks" DROP CONSTRAINT "tasks_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "user_tasks" DROP CONSTRAINT "tasks_assignment_id_assignments_id_fk";
--> statement-breakpoint
ALTER TABLE "user_tasks" DROP CONSTRAINT "tasks_task_progress_id_task_progress_id_fk";
--> statement-breakpoint
ALTER TABLE "team_membership_histories" DROP CONSTRAINT "team_memberships_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "team_membership_histories" DROP CONSTRAINT "team_memberships_team_id_teams_id_fk";
--> statement-breakpoint
ALTER TABLE "challenges" ADD COLUMN "challenge_category_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "team_membership_histories" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "user_type_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_challenge_category_id_challenge_categories_id_fk" FOREIGN KEY ("challenge_category_id") REFERENCES "public"."challenge_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_tasks" ADD CONSTRAINT "user_tasks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_tasks" ADD CONSTRAINT "user_tasks_challenge_id_challenges_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "public"."challenges"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_tasks" ADD CONSTRAINT "user_tasks_task_status_id_task_status_id_fk" FOREIGN KEY ("task_status_id") REFERENCES "public"."task_status"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_membership_histories" ADD CONSTRAINT "team_membership_histories_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_membership_histories" ADD CONSTRAINT "team_membership_histories_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_user_type_id_user_types_id_fk" FOREIGN KEY ("user_type_id") REFERENCES "public"."user_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "user_type";--> statement-breakpoint
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_content_url_unique" UNIQUE("content_url");--> statement-breakpoint
ALTER TABLE "task_status" ADD CONSTRAINT "task_status_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "user_tasks" ADD CONSTRAINT "user_challenge_unique" UNIQUE("user_id","challenge_id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_mail_address_unique" UNIQUE("mail_address");