import { eq } from "drizzle-orm";
import type {
  ChallengeListQueryServiceInterface,
  ChallengeListQueryServicePayload,
} from "../../application/query-service/challenge-list-query-service";
import type { Database } from "../../libs/drizzle/get-database";
import { challenges, challengeCategories } from "../../libs/drizzle/schema";

export class PostgresqlChallengeListQueryService
  implements ChallengeListQueryServiceInterface
{
  public constructor(private readonly database: Database) {}

  public async invoke(): Promise<ChallengeListQueryServicePayload> {
    return this.database
      .select({
        id: challenges.id,
        name: challenges.name,
        contentUrl: challenges.contentUrl,
        challengeCategory: challengeCategories.name,
      })
      .from(challenges)
      .innerJoin(challengeCategories, eq(challenges.challengeCategoryId, challengeCategories.id));
  }
}
