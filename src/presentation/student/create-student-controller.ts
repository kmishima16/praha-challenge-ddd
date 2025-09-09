import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createMiddleware } from "hono/factory";
import { z } from "zod";
import { CreateNewStudentUseCase } from "../../application/use-case/create-new-student";
import { PostgresqlAssignmentRepository } from "../../infrastructure/repository/postgresql-assignment-repository";
import { PostgresqlStudentRepository } from "../../infrastructure/repository/postgresql-student-repository";
import { getDatabase } from "../../libs/drizzle/get-database";

type Env = {
  Variables: {
    createNewStudentUseCase: CreateNewStudentUseCase;
  };
};

export const createStudentController = new Hono<Env>();

createStudentController.post(
  "/students",
  zValidator(
    "json",
    z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
    }),
  ),
  createMiddleware<Env>(async (context, next) => {
    const database = getDatabase();
    const studentRepository = new PostgresqlStudentRepository(database);
    const assignmentRepository = new PostgresqlAssignmentRepository(database);
    const createNewStudentUseCase = new CreateNewStudentUseCase(
      studentRepository,
      assignmentRepository,
    );
    context.set("createNewStudentUseCase", createNewStudentUseCase);

    await next();
  }),
  async (context) => {
    const body = context.req.valid("json");

    const payload = await context.var.createNewStudentUseCase.execute(body);
    return context.json(payload, 201);
  },
);
