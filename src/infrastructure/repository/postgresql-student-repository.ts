import type { DrizzleD1Database } from "drizzle-orm/d1";
import type { Student } from "../../domain/student/student";
import type { IStudentRepository } from "../../domain/student/student-repository";
import * as schema from "../../libs/drizzle/schema";

export class PostgresqlStudentRepository implements IStudentRepository {
  constructor(private readonly db: DrizzleD1Database<typeof schema>) {}

  public async save(student: Student): Promise<void> {
    await this.db.transaction(async (tx) => {
      // Studentの保存
      await tx.insert(schema.users).values({
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        emailAddress: student.mailAddress,
        userStatusId: student.status,
        userType: student.userType,
      });

      // Studentに紐づくTaskの保存
      const tasksValues = student.tasks.map((task) => ({
        id: task.id,
        userId: task.studentId,
        assignmentId: task.assignmentId,
        taskProgressId: task.status,
      }));

      await tx.insert(schema.tasks).values(tasksValues);
    });
  }
}
