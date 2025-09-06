import { ulid } from "../../libs/ulid";

type TaskStatus = "未着手" | "レビュー待ち" | "完了";

export class Task {
  #id: string;
  #studentId: string;
  #taskId: string;
  #status: TaskStatus;

  private constructor(
    id: string,
    studentId: string,
    taskId: string,
    status: TaskStatus,
  ) {
    this.#id = id;
    this.#studentId = studentId;
    this.#taskId = taskId;
    this.#status = status;
  }

  public static create(studentId: string, taskId: string): Task {
    const id = ulid();
    const status: TaskStatus = "未着手";
    return new Task(id, studentId, taskId, status);
  }

  public static reconstruct(
    id: string,
    studentId: string,
    taskId: string,
    status: TaskStatus,
  ): Task {
    return new Task(id, studentId, taskId, status);
  }

  public get id(): string {
    return this.#id;
  }

  public get studentId(): string {
    return this.#studentId;
  }

  public get taskId(): string {
    return this.#taskId;
  }

  public get status(): TaskStatus {
    return this.#status;
  }

  public changeStatus(newStatus: TaskStatus): void {
    this.#status = newStatus;
  }
}
