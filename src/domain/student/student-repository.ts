import type { Student } from "./student";

export interface StudentRepository {
  save(student: Student): Promise<void>;
  findById(id: string): Promise<Student | null>;
  findByEmail(email: string): Promise<Student | null>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Student[]>;
}
