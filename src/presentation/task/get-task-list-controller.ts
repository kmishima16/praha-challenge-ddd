import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createMiddleware } from "hono/factory";
import { z } from "zod";
import type { TaskListQueryServiceInterface } from "../../application/query-service/task-list-query-service";
import { PostgresqlTaskListQueryService } from "../../infrastructure/query-service/postgresql-task-list-query-service";
import { getDatabase } from "../../libs/drizzle/get-database";

type Env = {
  Variables: {
    taskListQueryService: TaskListQueryServiceInterface;
  };
};

export const getTaskListController = new Hono<Env>();

getTaskListController.get(
  "/tasks",
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
    const taskListQueryService = new PostgresqlTaskListQueryService(database);
    context.set("taskListQueryService", taskListQueryService);

    await next();
  }),
  async (context) => {
    const payload = await context.var.taskListQueryService.invoke();
    return context.json(payload);
  },
);
