ALTER TABLE "assignment_status_histories" RENAME TO "task_status_histories";--> statement-breakpoint
ALTER TABLE "task_status_histories" DROP CONSTRAINT "assignment_status_histories_task_id_tasks_id_fk";
--> statement-breakpoint
ALTER TABLE "task_status_histories" DROP CONSTRAINT "assignment_status_histories_task_progress_id_task_progress_id_fk";
--> statement-breakpoint
ALTER TABLE "task_status_histories" ADD CONSTRAINT "task_status_histories_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_status_histories" ADD CONSTRAINT "task_status_histories_task_progress_id_task_progress_id_fk" FOREIGN KEY ("task_progress_id") REFERENCES "public"."task_progress"("id") ON DELETE no action ON UPDATE no action;