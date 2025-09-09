import type { Task } from "./task";

export interface ITaskRepository {
  save(task: Task): Promise<void>;
}
