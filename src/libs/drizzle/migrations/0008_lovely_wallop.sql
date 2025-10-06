ALTER TABLE "team_membership_histories" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "team_membership_histories" CASCADE;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "team_id" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "first_name";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "last_name";