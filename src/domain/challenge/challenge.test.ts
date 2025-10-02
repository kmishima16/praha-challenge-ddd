import { describe, expect, it } from "vitest";
import { Challenge } from "./challenge";

describe("Challenge Entity", () => {
  describe("create", () => {
    it("Challengeを作成できる", () => {
      const challengeName = "特大課題：プラハチャレンジをDDDで実装してみる";
      const contentUrl =
        "https://separated-rover-67e.notion.site/DDD-03e9d01f643244f0ad9d80f148a46563";
      const challengeCategory = "データベース設計";

      const challenge = Challenge.create(
        challengeName,
        contentUrl,
        challengeCategory,
      );

      expect(challenge.id).toBeDefined(); // id採番が正しくできているか
      expect(typeof challenge.id).toBe("string");
      expect(challenge.name).toBe(challengeName);
      expect(challenge.content_url).toBe(contentUrl);
      expect(challenge.challengeCategory).toBe(challengeCategory);
    });

    it("nameが空白の場合、エラーを返す", () => {
      expect(() => {
        Challenge.create("", "https://example.com/spec", "テスト");
      }).toThrow("課題名が未入力です。");
    });

    it("content_urlが空白の場合、エラーを返す", () => {
      expect(() => {
        Challenge.create("Valid Name", "", "テスト");
      }).toThrow("課題のURLが未入力です。");
    });
  });

  describe("reconstruct", () => {
    it("Challengeのreconstructができる", () => {
      const id = "01ARZ3ABC";
      const challengeName = "データベースから取得したタスク";
      const contentUrl = "https://example.com/db-spec";
      const challengeCategory = "SQL";

      const challenge = Challenge.reconstruct(
        id,
        challengeName,
        contentUrl,
        challengeCategory,
      );

      expect(challenge.id).toBe(id);
      expect(challenge.name).toBe(challengeName);
      expect(challenge.content_url).toBe(contentUrl);
      expect(challenge.challengeCategory).toBe(challengeCategory);
    });
  });

  describe("changeName", () => {
    it("名前を変更できる", () => {
      const initialName = "before change";
      const updatedName = "after change";
      const contentUrl = "https://example.com";
      const challengeCategory = "フロントエンド";

      const challenge = Challenge.create(
        initialName,
        contentUrl,
        challengeCategory,
      );
      challenge.changeName(updatedName);

      expect(challenge.name).toBe(updatedName);
    });

    it("名前が未入力の場合、エラー出力", () => {
      const contentUrl = "https://example.com";
      const challengeCategory = "Webの基礎";
      const challenge = Challenge.create(
        "Valid Name",
        contentUrl,
        challengeCategory,
      );

      // 空文字への変更はエラーになること
      expect(() => {
        challenge.changeName("");
      }).toThrow("課題名が未入力です。");
    });
  });
});
