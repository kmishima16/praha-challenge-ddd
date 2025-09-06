import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createMiddleware } from "hono/factory";
import { z } from "zod";
import {
  EditAssignmentTitleUseCase,
  EditAssignmentTitleUseCaseNotFoundError,
} from "../../application/use-case/edit-assignment-title-use-case";
import { PostgresqlAssignmentRepository } from "../../infrastructure/repository/postgresql-assignment-repository";
import { getDatabase } from "../../libs/drizzle/get-database";

type Env = {
  Variables: {
    editAssignmentTitleUseCase: EditAssignmentTitleUseCase;
  };
};

export const editAssignmentTitleController = new Hono<Env>();

editAssignmentTitleController.patch(
  "/assignments/:id",
  zValidator("param", z.object({ id: z.string() })),
  zValidator("json", z.object({ name: z.string() })),
  createMiddleware<Env>(async (context, next) => {
    const database = getDatabase();
    const assignmentRepository = new PostgresqlAssignmentRepository(database);
    const editAssignmentTitleUseCase = new EditAssignmentTitleUseCase(
      assignmentRepository,
    );
    context.set("editAssignmentTitleUseCase", editAssignmentTitleUseCase);

    await next();
  }),
  async (context) => {
    try {
      const param = context.req.valid("param");
      const body = context.req.valid("json");

      const payload = await context.var.editAssignmentTitleUseCase.invoke({
        assignmentId: param.id,
        name: body.name,
      });
      return context.json(payload);
    } catch (error) {
      if (error instanceof EditAssignmentTitleUseCaseNotFoundError) {
        return context.text(error.message, 404);
      }

      throw error;
    }
  },
);
