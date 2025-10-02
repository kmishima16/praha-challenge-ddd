import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createMiddleware } from "hono/factory";
import { z } from "zod";
import {
  EditChallengeTitleUseCase,
  EditChallengeTitleUseCaseNotFoundError,
} from "../../application/use-case/edit-challenge-title-use-case";
import { PostgresqlChallengeRepository } from "../../infrastructure/repository/postgresql-challenge-repository";
import { getDatabase } from "../../libs/drizzle/get-database";

type Env = {
  Variables: {
    editChallengeTitleUseCase: EditChallengeTitleUseCase;
  };
};

export const editChallengeTitleController = new Hono<Env>();

editChallengeTitleController.put(
  "/challenges/:challengeId/title",
  zValidator("json", z.object({ name: z.string() })),
  createMiddleware<Env>(async (context, next) => {
    const database = getDatabase();
    const challengeRepository = new PostgresqlChallengeRepository(database);
    const editChallengeTitleUseCase = new EditChallengeTitleUseCase(
      challengeRepository,
    );
    context.set("editChallengeTitleUseCase", editChallengeTitleUseCase);

    await next();
  }),
  async (context) => {
    const challengeId = context.req.param("challengeId");
    const body = context.req.valid("json");

    try {
      const payload = await context.var.editChallengeTitleUseCase.invoke({
        challengeId,
        name: body.name,
      });
      return context.json(payload);
    } catch (error) {
      if (error instanceof EditChallengeTitleUseCaseNotFoundError) {
        return context.json({ error: "Challenge not found" }, 404);
      }
      throw error;
    }
  },
);
