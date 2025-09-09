import type { IAssignmentRepository } from "../assignment/assignment-repository";
import { Student } from "../student/student";
import type { MailAddress } from "../student/value-object/mail-address";
import { Task } from "../task/task";

export class CreateNewStudentWithInitialTasks {
  constructor(private readonly assignmentRepository: IAssignmentRepository) {}

  public async invoke(
    firstName: string,
    lastName: string,
    email: MailAddress,
  ): Promise<Student> {
    // 生成
    const student = Student.create(firstName, lastName, email);
    const assignments = await this.assignmentRepository.findAll();
    const initialTasks = assignments.map((assignment) => {
      return Task.create(student.id, assignment.id);
    });

    // Taskの追加
    student.assignInitialTasks(initialTasks);

    return student;
  }
}
