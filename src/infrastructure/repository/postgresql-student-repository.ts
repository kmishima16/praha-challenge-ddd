import type { Student } from "../../domain/student/student";
import type { IStudentRepository } from "../../domain/student/student-repository";
import * as schema from "../../libs/drizzle/schema";
import type { Database } from "../../libs/drizzle/get-database";

export class PostgresqlStudentRepository implements IStudentRepository {
  constructor(private readonly database: Database) {}

  public async save(student: Student): Promise<void> {
    await this.database.transaction(async (tx) => {
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
