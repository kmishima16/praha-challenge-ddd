import { eq } from "drizzle-orm";
import {
  Challenge,
  type ChallengeCategory,
} from "../../domain/challenge/challenge";
import type { IChallengeRepository } from "../../domain/challenge/challenge-repository";
import type { Database } from "../../libs/drizzle/get-database";
import { challengeCategories, challenges } from "../../libs/drizzle/schema";

export class PostgresqlChallengeRepository implements IChallengeRepository {
  public constructor(private readonly database: Database) {}

  public async save(challenge: Challenge) {
    // First, get the challenge category ID from the category name
    const [categoryRow] = await this.database
      .select({ id: challengeCategories.id })
      .from(challengeCategories)
      .where(eq(challengeCategories.name, challenge.challengeCategory));

    if (!categoryRow) {
      throw new Error(
        `Challenge category not found: ${challenge.challengeCategory}`,
      );
    }

    await this.database
      .insert(challenges)
      .values({
        id: challenge.id,
        challengeCategoryId: categoryRow.id,
        name: challenge.name,
        contentUrl: challenge.content_url,
      })
      .onConflictDoUpdate({
        target: challenges.id,
        set: {
          name: challenge.name,
          updatedAt: new Date(),
        },
      });
  }

  public async findById(id: string) {
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
      .where(eq(challenges.id, id));

    if (!row) {
      return null;
    }

    return Challenge.reconstruct(
      row.id,
      row.name,
      row.contentUrl,
      row.challengeCategory as ChallengeCategory,
    );
  }

  public async findAll() {
    const rows = await this.database
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
      );

    return rows.map((row) =>
      Challenge.reconstruct(
        row.id,
        row.name,
        row.contentUrl,
        row.challengeCategory as ChallengeCategory,
      ),
    );
  }
}
