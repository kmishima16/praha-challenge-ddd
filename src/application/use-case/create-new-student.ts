import type { IAssignmentRepository } from "../../domain/assignment/assignment-repository";
import { CreateNewStudentWithInitialTasks } from "../../domain/domain-service/create-new-student-with-initial-tasks";
import type { IStudentRepository } from "../../domain/student/student-repository";
import { MailAddress } from "../../domain/student/value-object/mail-address";

export interface CreateNewStudentUseCaseInput {
  firstName: string;
  lastName: string;
  email: string;
}

export class CreateNewStudentUseCase {
  private readonly createNewStudentWithInitialTasks: CreateNewStudentWithInitialTasks;

  constructor(
    private readonly studentRepository: IStudentRepository,
    private readonly assignmentRepository: IAssignmentRepository,
  ) {
    this.createNewStudentWithInitialTasks =
      new CreateNewStudentWithInitialTasks(this.assignmentRepository);
  }

  public async execute(
    input: CreateNewStudentUseCaseInput,
  ): Promise<{ studentId: string }> {
    const mailAddress = MailAddress.create(input.email);

    const student = await this.createNewStudentWithInitialTasks.invoke(
      input.firstName,
      input.lastName,
      mailAddress,
    );

    await this.studentRepository.save(student);

    return { studentId: student.id };
  }
}
