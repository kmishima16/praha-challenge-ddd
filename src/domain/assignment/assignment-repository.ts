import type { Assignment } from "./assignment";

export interface IAssignmentRepository {
  save(Assignment: Assignment): Promise<void>;
  findById(id: string): Promise<Assignment | null>;
}
