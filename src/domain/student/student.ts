import { ulid } from "../../libs/ulid";
import type { Task } from "../task/task";
import type { MailAddress } from "./value-object/mail-address";

type StudentStatus = "在籍中" | "休会中" | "退会済" | "卒業済";

export class Student {
  #id: string;
  #firstName: string;
  #lastName: string;
  #email: MailAddress;
  #status: StudentStatus;
  #tasks: Task[];

  private constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: MailAddress,
    status: StudentStatus,
  ) {
    if (firstName.length === 0) {
      throw new Error("苗字が未入力です。");
    }
    if (lastName.length === 0) {
      throw new Error("名前が未入力です。");
    }

    this.#id = id;
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#email = email;
    this.#status = status;
    this.#tasks = [];
  }

  public static create(
    firstName: string,
    lastName: string,
    email: MailAddress,
  ): Student {
    const id = ulid();
    const status: StudentStatus = "在籍中";
    return new Student(id, firstName, lastName, email, status);
  }

  public static reconstruct(
    id: string,
    firstName: string,
    lastName: string,
    email: MailAddress,
    status: StudentStatus,
  ): Student {
    return new Student(id, firstName, lastName, email, status);
  }

  public get id(): string {
    return this.#id;
  }

  public get name(): string {
    return `${this.#firstName} ${this.#lastName}`;
  }

  public get email(): string {
    return this.#email.getAddress();
  }

  public get status(): StudentStatus {
    return this.#status;
  }

  public get tasks(): Task[] {
    return this.#tasks;
  }

  /**
   * 在籍ステータスを変更します。
   * @param newStatus 新しい在籍ステータス
   */
  public changeStatus(newStatus: StudentStatus): void {
    this.#status = newStatus;
  }

  /**
   * student生成時は、全てのassignmentにおける"未着手"状態のtaskが付与される。
   * @param tasks 割り当てるタスクの配列
   */
  public assignInitialTasks(tasks: Task[]): void {
    for(const task of tasks) {
      this.#tasks.push(task);
    }
  }
}
