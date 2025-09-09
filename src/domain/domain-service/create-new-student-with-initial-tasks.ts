import type { IAssignmentRepository } from "../assignment/assignment-repository";
import { Student } from "../student/student";
import type { IStudentRepository } from "../student/student-repository";
import type { MailAddress } from "../student/value-object/mail-address";
import { Task } from "../task/task";
import type { ITaskRepository } from "../task/task-repository";

export class CreateNewStudentWithInitialTasks {
  constructor(
    private readonly studentRepository: IStudentRepository,
    private readonly assignmentRepository: IAssignmentRepository,
    private readonly taskRepository: ITaskRepository,
  ) {}

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

    // 保存
    await this.studentRepository.save(student);
    for (const task of initialTasks) {
      await this.taskRepository.save(task);
    }

    return student;
  }
}
