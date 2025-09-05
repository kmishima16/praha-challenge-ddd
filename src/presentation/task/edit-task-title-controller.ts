import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createMiddleware } from "hono/factory";
import { z } from "zod";
import {
  EditTaskTitleUseCase,
  EditTaskTitleUseCaseNotFoundError,
} from "../../application/use-case/edit-task-title-use-case";
import { PostgresqlTaskRepository } from "../../infrastructure/repository/postgresql-task-repository";
import { getDatabase } from "../../libs/drizzle/get-database";

type Env = {
  Variables: {
    editTaskTitleUseCase: EditTaskTitleUseCase;
  };
};

export const editTaskTitleController = new Hono<Env>();

editTaskTitleController.patch(
  "/tasks/:id",
  zValidator("param", z.object({ id: z.string() })),
  zValidator("json", z.object({ name: z.string() })),
  createMiddleware<Env>(async (context, next) => {
    const database = getDatabase();
    const taskRepository = new PostgresqlTaskRepository(database);
    const editTaskTitleUseCase = new EditTaskTitleUseCase(taskRepository);
    context.set("editTaskTitleUseCase", editTaskTitleUseCase);

    await next();
  }),
  async (context) => {
    try {
      const param = context.req.valid("param");
      const body = context.req.valid("json");

      const payload = await context.var.editTaskTitleUseCase.invoke({
        taskId: param.id,
        name: body.name,
      });
      return context.json(payload);
    } catch (error) {
      if (error instanceof EditTaskTitleUseCaseNotFoundError) {
        return context.text(error.message, 404);
      }

      throw error;
    }
  },
);
