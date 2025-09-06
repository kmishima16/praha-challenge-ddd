import type {
  AssignmentListQueryServiceInterface,
  AssignmentListQueryServicePayload,
} from "../../application/query-service/assignment-list-query-service";
import type { Database } from "../../libs/drizzle/get-database";
import { assignments } from "../../libs/drizzle/schema";

export class PostgresqlAssignmentListQueryService
  implements AssignmentListQueryServiceInterface
{
  public constructor(private readonly database: Database) {}

  public async invoke(): Promise<AssignmentListQueryServicePayload> {
    return this.database
      .select({
        id: assignments.id,
        name: assignments.name,
        contentUrl: assignments.contentUrl,
      })
      .from(assignments);
  }
}
