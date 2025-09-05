import { ulid } from "../../libs/ulid";

export class Task {
  #id: string;
  #name: string;
  #content_url: string;

  private constructor(id: string, name: string, content_url: string) {
    if (name.length === 0) {
      throw new Error("課題名が未入力です。");
    }
    this.#id = id;
    this.#name = name;
    this.#content_url = content_url;
  }

  public static create(name: string, content_url: string): Task {
    const id = ulid();
    return new Task(id, name, content_url);
  }

  public static reconstruct(
    id: string,
    name: string,
    content_url: string,
  ): Task {
    return new Task(id, name, content_url);
  }

  public get id(): string {
    return this.#id;
  }

  public get name(): string {
    return this.#name;
  }

  public get content_url(): string | null {
    return this.#content_url;
  }

  public changeName(newName: string): void {
    if (newName.length === 0) {
      throw new Error("課題名が未入力です。");
    }
    this.#name = newName;
  }
}
