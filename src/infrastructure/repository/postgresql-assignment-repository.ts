import { eq } from "drizzle-orm";
import { Assignment } from "../../domain/assignment/assignment";
import type { IAssignmentRepository } from "../../domain/assignment/assignment-repository";
import type { Database } from "../../libs/drizzle/get-database";
import { assignments } from "../../libs/drizzle/schema";

export class PostgresqlAssignmentRepository implements IAssignmentRepository {
  public constructor(private readonly database: Database) {}

  public async save(assignment: Assignment) {
    await this.database
      .insert(assignments)
      .values({
        id: assignment.id,
        name: assignment.name,
        contentUrl: assignment.content_url,
      })
      .onConflictDoUpdate({
        target: assignments.id,
        set: {
          name: assignment.name,
          updatedAt: new Date(),
        },
      });
  }

  public async findById(id: string) {
    const [row] = await this.database
      .select({
        id: assignments.id,
        name: assignments.name,
        contentUrl: assignments.contentUrl,
      })
      .from(assignments)
      .where(eq(assignments.id, id));

    if (!row) {
      return null;
    }

    return Assignment.reconstruct(row.id, row.name, row.contentUrl);
  }

    public async findAll() {
    const rows = await this.database
      .select({
        id: assignments.id,
        name: assignments.name,
        contentUrl: assignments.contentUrl,
      })
      .from(assignments);

    return rows.map((row) =>
      Assignment.reconstruct(row.id, row.name, row.contentUrl),
    );
  }

}
