import { eq } from "drizzle-orm";
import type {
  AssignmentQueryServiceInput,
  AssignmentQueryServiceInterface,
  AssignmentQueryServicePayload,
} from "../../application/query-service/assignment-query-service";
import type { Database } from "../../libs/drizzle/get-database";
import { assignments } from "../../libs/drizzle/schema";

export class PostgresqlAssignmentQueryService implements AssignmentQueryServiceInterface {
  public constructor(private readonly database: Database) {}

  public async invoke(
    input: AssignmentQueryServiceInput,
  ): Promise<AssignmentQueryServicePayload | undefined> {
    const [row] = await this.database
      .select({
        id: assignments.id,
        name: assignments.name,
        contentUrl: assignments.contentUrl,
      })
      .from(assignments)
      .where(eq(assignments.id, input.id));

    return row;
  }
}
