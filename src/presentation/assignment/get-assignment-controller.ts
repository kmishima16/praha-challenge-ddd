import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createMiddleware } from "hono/factory";
import { z } from "zod";
import type { AssignmentQueryServiceInterface } from "../../application/query-service/assignment-query-service";
import { PostgresqlAssignmentQueryService } from "../../infrastructure/query-service/postgresql-assignment-query-service";
import { getDatabase } from "../../libs/drizzle/get-database";

type Env = {
  Variables: {
    assignmentQueryService: AssignmentQueryServiceInterface;
  };
};

export const getAssignmentController = new Hono();

getAssignmentController.get(
  "/assignments/:id",
  zValidator("param", z.object({ id: z.string() }), (result, c) => {
    if (!result.success) {
      return c.text("invalid id", 400);
    }

    return;
  }),
  createMiddleware<Env>(async (context, next) => {
    const database = getDatabase();
    const assignmentQueryService = new PostgresqlAssignmentQueryService(
      database,
    );
    context.set("assignmentQueryService", assignmentQueryService);

    await next();
  }),
  async (context) => {
    const param = context.req.valid("param");

    const payload = await context.var.assignmentQueryService.invoke(param);
    if (!payload) {
      return context.text("assignment not found", 404);
    }
    return context.json(payload);
  },
);
