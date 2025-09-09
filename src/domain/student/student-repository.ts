import type { Student } from "./student";
import type { MailAddress } from "./value-object/mail-address";

export interface IStudentRepository {
  save(student: Student): Promise<void>;
  // findById(id: string): Promise<Student | null>;
  findByEmail(email: MailAddress): Promise<Student | null>;
  // delete(id: string): Promise<void>;
  // findAll(): Promise<Student[]>;
}
