import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createMiddleware } from "hono/factory";
import { z } from "zod";
import { CreateChallengeUseCase } from "../../application/use-case/create-challenge-use-case";
import { CHALLENGE_CATEGORIES } from "../../domain/challenge/challenge";
import { PostgresqlChallengeRepository } from "../../infrastructure/repository/postgresql-challenge-repository";
import { getDatabase } from "../../libs/drizzle/get-database";

type Env = {
  Variables: {
    createChallengeUseCase: CreateChallengeUseCase;
  };
};

export const createChallengeController = new Hono<Env>();

createChallengeController.post(
  "/challenges",
  zValidator(
    "json",
    z.object({
      name: z.string(),
      contentUrl: z.string().url(),
      challengeCategory: z.enum(
        Object.values(CHALLENGE_CATEGORIES) as [string, ...string[]],
      ),
    }),
  ),
  createMiddleware<Env>(async (context, next) => {
    const database = getDatabase();
    const challengeRepository = new PostgresqlChallengeRepository(database);
    const createChallengeUseCase = new CreateChallengeUseCase(
      challengeRepository,
    );
    context.set("createChallengeUseCase", createChallengeUseCase);

    await next();
  }),
  async (context) => {
    const body = context.req.valid("json");

    const payload = await context.var.createChallengeUseCase.invoke(body);
    return context.json(payload, 201);
  },
);
