import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createMiddleware } from "hono/factory";
import { z } from "zod";
import type { ChallengeListQueryServiceInterface } from "../../application/query-service/challenge-list-query-service";
import { PostgresqlChallengeListQueryService } from "../../infrastructure/query-service/postgresql-challenge-list-query-service";
import { getDatabase } from "../../libs/drizzle/get-database";

type Env = {
  Variables: {
    challengeListQueryService: ChallengeListQueryServiceInterface;
  };
};

export const getChallengeListController = new Hono<Env>();

getChallengeListController.get(
  "/challenges",
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
    const challengeListQueryService = new PostgresqlChallengeListQueryService(
      database,
    );
    context.set("challengeListQueryService", challengeListQueryService);

    await next();
  }),
  async (context) => {
    const payload = await context.var.challengeListQueryService.invoke();
    return context.json(payload);
  },
);
