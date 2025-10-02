import { ulid } from "../../libs/ulid";

export const CHALLENGE_CATEGORIES = {
  DatabaseDesign: "データベース設計",
  Test: "テスト",
  SQL: "SQL",
  Frontend: "フロントエンド",
  WebBasics: "Webの基礎",
};

export type ChallengeCategory =
  (typeof CHALLENGE_CATEGORIES)[keyof typeof CHALLENGE_CATEGORIES];

export class Challenge {
  #id: string;
  #name: string;
  #content_url: string;
  #challengeCategory: ChallengeCategory;

  private constructor(
    id: string,
    name: string,
    content_url: string,
    challengeCategory: ChallengeCategory,
  ) {
    if (name.length === 0) {
      throw new Error("課題名が未入力です。");
    }
    if (content_url.length === 0) {
      throw new Error("課題のURLが未入力です。");
    }
    this.#id = id;
    this.#name = name;
    this.#content_url = content_url;
    this.#challengeCategory = challengeCategory;
  }

  public static create(
    name: string,
    content_url: string,
    challengeCategory: ChallengeCategory,
  ): Challenge {
    const id = ulid();
    return new Challenge(id, name, content_url, challengeCategory);
  }

  public static reconstruct(
    id: string,
    name: string,
    content_url: string,
    challengeCategory: ChallengeCategory,
  ): Challenge {
    return new Challenge(id, name, content_url, challengeCategory);
  }

  public get id(): string {
    return this.#id;
  }

  public get name(): string {
    return this.#name;
  }

  public get content_url(): string {
    return this.#content_url;
  }

  public get challengeCategory(): ChallengeCategory {
    return this.#challengeCategory;
  }

  public changeName(newName: string): void {
    if (newName.length === 0) {
      throw new Error("課題名が未入力です。");
    }
    this.#name = newName;
  }
}
