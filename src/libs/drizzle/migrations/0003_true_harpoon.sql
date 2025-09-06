ALTER TABLE "assignment_status_histories" RENAME COLUMN "assignment_id" TO "task_id";--> statement-breakpoint
ALTER TABLE "assignments" DROP CONSTRAINT "unique_user_task";--> statement-breakpoint
ALTER TABLE "assignment_status_histories" DROP CONSTRAINT "assignment_status_histories_assignment_id_assignments_id_fk";
--> statement-breakpoint
ALTER TABLE "assignments" DROP CONSTRAINT "assignments_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "assignments" DROP CONSTRAINT "assignments_task_id_tasks_id_fk";
--> statement-breakpoint
ALTER TABLE "assignments" DROP CONSTRAINT "assignments_task_progress_id_task_progress_id_fk";
--> statement-breakpoint
ALTER TABLE "assignments" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "assignments" ADD COLUMN "name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "assignments" ADD COLUMN "content_url" varchar(2048) NOT NULL;--> statement-breakpoint
ALTER TABLE "assignments" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "user_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "assignment_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "task_progress_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "assignment_status_histories" ADD CONSTRAINT "assignment_status_histories_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assignment_id_assignments_id_fk" FOREIGN KEY ("assignment_id") REFERENCES "public"."assignments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_task_progress_id_task_progress_id_fk" FOREIGN KEY ("task_progress_id") REFERENCES "public"."task_progress"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assignments" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "assignments" DROP COLUMN "task_id";--> statement-breakpoint
ALTER TABLE "assignments" DROP COLUMN "task_progress_id";--> statement-breakpoint
ALTER TABLE "tasks" DROP COLUMN "name";--> statement-breakpoint
ALTER TABLE "tasks" DROP COLUMN "content_url";--> statement-breakpoint
ALTER TABLE "tasks" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "unique_user_assignment" UNIQUE("user_id","assignment_id");