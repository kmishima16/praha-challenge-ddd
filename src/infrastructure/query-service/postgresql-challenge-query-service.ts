import { eq } from "drizzle-orm";
import type {
  ChallengeQueryServiceInput,
  ChallengeQueryServiceInterface,
  ChallengeQueryServicePayload,
} from "../../application/query-service/challenge-query-service";
import type { Database } from "../../libs/drizzle/get-database";
import { challenges, challengeCategories } from "../../libs/drizzle/schema";

export class PostgresqlChallengeQueryService
  implements ChallengeQueryServiceInterface
{
  public constructor(private readonly database: Database) {}

  public async invoke(
    input: ChallengeQueryServiceInput,
  ): Promise<ChallengeQueryServicePayload | undefined> {
    const [row] = await this.database
      .select({
        id: challenges.id,
        name: challenges.name,
        contentUrl: challenges.contentUrl,
        challengeCategory: challengeCategories.name,
      })
      .from(challenges)
      .innerJoin(
        challengeCategories,
        eq(challenges.challengeCategoryId, challengeCategories.id),
      )
      .where(eq(challenges.id, input.id));

    return row;
  }
}
