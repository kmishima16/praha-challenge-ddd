import type { IStudentRepository } from "../student-repository";
import type { MailAddress } from "../value-object/mail-address";

export class EmailNotDuplicated {
  private readonly studentRepository: IStudentRepository;

  public constructor(studentRepository: IStudentRepository) {
    this.studentRepository = studentRepository;
  }

  public async invoke(email: MailAddress): Promise<boolean> {
    const foundStudent = await this.studentRepository.findByEmail(email);
    return foundStudent === null;
  }
}
