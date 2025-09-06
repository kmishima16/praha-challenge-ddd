import { ulid } from "../../libs/ulid";

type AssignmentStatus = "未着手" | "レビュー待ち" | "完了";

export class Assignment {
  #id: string;
  #studentId: string;
  #taskId: string;
  #status: AssignmentStatus;

  private constructor(
    id: string,
    studentId: string,
    taskId: string,
    status: AssignmentStatus,
  ) {
    this.#id = id;
    this.#studentId = studentId;
    this.#taskId = taskId;
    this.#status = status;
  }

  public static create(studentId: string, taskId: string): Assignment {
    const id = ulid();
    const status: AssignmentStatus = "未着手";
    return new Assignment(id, studentId, taskId, status);
  }

  public static reconstruct(
    id: string,
    studentId: string,
    taskId: string,
    status: AssignmentStatus,
  ): Assignment {
    return new Assignment(id, studentId, taskId, status);
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

  public get status(): AssignmentStatus {
    return this.#status;
  }

  public changeStatus(newStatus: AssignmentStatus): void {
    this.#status = newStatus;
  }
}
