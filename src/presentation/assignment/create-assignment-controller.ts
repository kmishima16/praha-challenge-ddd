import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createMiddleware } from "hono/factory";
import { z } from "zod";
import { CreateAssignmentUseCase } from "../../application/use-case/create-assignment-use-case";
import { PostgresqlAssignmentRepository } from "../../infrastructure/repository/postgresql-assignment-repository";
import { getDatabase } from "../../libs/drizzle/get-database";

type Env = {
  Variables: {
    createAssignmentUseCase: CreateAssignmentUseCase;
  };
};

export const createAssignmentController = new Hono<Env>();

createAssignmentController.post(
  "/assignments",
  zValidator(
    "json",
    z.object({ name: z.string(), contentUrl: z.string().url() }),
  ),
  createMiddleware<Env>(async (context, next) => {
    const database = getDatabase();
    const assignmentRepository = new PostgresqlAssignmentRepository(database);
    const createAssignmentUseCase = new CreateAssignmentUseCase(assignmentRepository);
    context.set("createAssignmentUseCase", createAssignmentUseCase);

    await next();
  }),
  async (context) => {
    const body = context.req.valid("json");

    const payload = await context.var.createAssignmentUseCase.invoke(body);
    return context.json(payload, 201);
  },
);
