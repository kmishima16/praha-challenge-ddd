import { eq } from "drizzle-orm";
import { Task } from "../../domain/task/task";
import type { ITaskRepository } from "../../domain/task/task-repository";
import type { Database } from "../../libs/drizzle/get-database";
import { tasks } from "../../libs/drizzle/schema";

export class PostgresqlTaskRepository implements ITaskRepository {
  public constructor(private readonly database: Database) {}

  public async save(task: Task) {
    await this.database
      .insert(tasks)
      .values({
        id: task.id,
        name: task.name,
        contentUrl: task.content_url,
      })
      .onConflictDoUpdate({
        target: tasks.id,
        set: {
          name: task.name,
          updatedAt: new Date(),
        },
      });
  }

  public async findById(id: string) {
    const [row] = await this.database
      .select({
        id: tasks.id,
        name: tasks.name,
        contentUrl: tasks.contentUrl,
      })
      .from(tasks)
      .where(eq(tasks.id, id));

    if (!row) {
      return null;
    }

    return Task.reconstruct(row.id, row.name, row.contentUrl);
  }
}