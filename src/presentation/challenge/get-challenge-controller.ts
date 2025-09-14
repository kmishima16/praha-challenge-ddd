import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createMiddleware } from "hono/factory";
import { z } from "zod";
import type { ChallengeQueryServiceInterface } from "../../application/query-service/challenge-query-service";
import { PostgresqlChallengeQueryService } from "../../infrastructure/query-service/postgresql-challenge-query-service";
import { getDatabase } from "../../libs/drizzle/get-database";

type Env = {
  Variables: {
    challengeQueryService: ChallengeQueryServiceInterface;
  };
};

export const getChallengeController = new Hono();

getChallengeController.get(
  "/challenges/:id",
  zValidator("param", z.object({ id: z.string() }), (result, c) => {
    if (!result.success) {
      return c.text("invalid id", 400);
    }

    return;
  }),
  createMiddleware<Env>(async (context, next) => {
    const database = getDatabase();
    const challengeQueryService = new PostgresqlChallengeQueryService(
      database,
    );
    context.set("challengeQueryService", challengeQueryService);

    await next();
  }),
  async (context) => {
    const param = context.req.valid("param");

    const payload = await context.var.challengeQueryService.invoke(param);
    if (!payload) {
      return context.text("challenge not found", 404);
    }
    return context.json(payload);
  },
);
