import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createMiddleware } from "hono/factory";
import { z } from "zod";
import type { AssignmentListQueryServiceInterface } from "../../application/query-service/assignment-list-query-service";
import { PostgresqlAssignmentListQueryService } from "../../infrastructure/query-service/postgresql-assignment-list-query-service";
import { getDatabase } from "../../libs/drizzle/get-database";

type Env = {
  Variables: {
    assignmentListQueryService: AssignmentListQueryServiceInterface;
  };
};

export const getAssignmentListController = new Hono<Env>();

getAssignmentListController.get(
  "/assignments",
  zValidator(
    "query",
    z.object({ filter: z.string().optional() }),
    (result, c) => {
      if (!result.success) {
        return c.text("invalid query", 400);
      }

      return;
    },
  ),
  createMiddleware<Env>(async (context, next) => {
    const database = getDatabase();
    const assignmentListQueryService = new PostgresqlAssignmentListQueryService(database);
    context.set("assignmentListQueryService", assignmentListQueryService);

    await next();
  }),
  async (context) => {
    const payload = await context.var.assignmentListQueryService.invoke();
    return context.json(payload);
  },
);
