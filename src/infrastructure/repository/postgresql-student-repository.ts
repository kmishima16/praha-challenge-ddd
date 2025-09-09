import { eq } from "drizzle-orm";
import type { Student } from "../../domain/student/student";
import type { IStudentRepository } from "../../domain/student/student-repository";
import type { Database } from "../../libs/drizzle/get-database";
import * as schema from "../../libs/drizzle/schema";
import { ulid } from "../../libs/ulid";

export class PostgresqlStudentRepository implements IStudentRepository {
  constructor(private readonly database: Database) {}

  public async save(student: Student): Promise<void> {
    await this.database.transaction(async (tx) => {
      // studentに保存するuser_statusのID
      const userStatus = await tx.query.userStatus.findFirst({
        where: eq(schema.userStatus.name, student.status),
      });

      if (!userStatus) {
        throw new Error(`User status "${student.status}" not found.`);
      }

      // studentに紐づくtask保存用のオブジェクトを準備
      const taskStatusName = student.tasks[0]?.status;
      if (!taskStatusName) {
        throw new Error("Task status is not empty.");
      }
      const taskProgress = await tx.query.taskProgress.findFirst({
        where: eq(schema.taskProgress.name, taskStatusName),
      });
      if (!taskProgress) {
        throw new Error(`Task progress "${taskStatusName}" not found.`);
      }

      const tasksValues: (typeof schema.tasks.$inferInsert)[] = [];
      const taskStatusHistoriesValues: (typeof schema.taskStatusHistories.$inferInsert)[] =
        [];

      for(const task of student.tasks){
        const taskProgressId = taskProgress.id;
        if (!taskProgressId) {
          throw new Error(`Task progress ID for "${task.status}" not found.`);
        }
        tasksValues.push({
          id: task.id,
          userId: task.studentId,
          assignmentId: task.assignmentId,
          taskProgressId: taskProgressId,
        });
        taskStatusHistoriesValues.push({
          id: ulid(),
          taskId: task.id,
          taskProgressId: taskProgressId,
        });
      }

      // Studentの保存
      await tx.insert(schema.users).values({
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        emailAddress: student.mailAddress,
        userStatusId: userStatus.id,
        userType: student.userType,
      });

      // UserStatusHistoryの保存
      await tx.insert(schema.userStatusHistories).values({
        id: ulid(),
        userId: student.id,
        userStatusId: userStatus.id,
      });

      // Studentに紐づくTaskの保存
      if (tasksValues.length > 0) {
        await tx.insert(schema.tasks).values(tasksValues);
      }

      // TaskStatusHistoryの保存
      if (taskStatusHistoriesValues.length > 0) {
        await tx
          .insert(schema.taskStatusHistories)
          .values(taskStatusHistoriesValues);
      }
    });
  }
}
