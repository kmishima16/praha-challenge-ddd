import { describe, expect, it } from "vitest";
import { Assignment } from "./assignment";

describe("Assignment Entity", () => {
  describe("create", () => {
    it("Assignmentを作成できる", () => {
      const AssignmentName = "特大課題：プラハチャレンジをDDDで実装してみる";
      const contentUrl =
        "https://separated-rover-67e.notion.site/DDD-03e9d01f643244f0ad9d80f148a46563";

      const assignment = Assignment.create(AssignmentName, contentUrl);

      expect(assignment.id).toBeDefined(); // id採番が正しくできているか
      expect(typeof assignment.id).toBe("string");
      expect(assignment.name).toBe(AssignmentName);
      expect(assignment.content_url).toBe(contentUrl);
    });

    it("nameが空白の場合、エラーを返す", () => {
      expect(() => {
        Assignment.create("", "https://example.com/spec");
      }).toThrow("課題名が未入力です。");
    });
  });

  describe("reconstruct", () => {
    it("Assignmentのreconstructができる", () => {
      const id = "01ARZ3ABC"; //
      const AssignmentName = "データベースから取得したタスク";
      const contentUrl = "https://example.com/db-spec";

      const assignment = Assignment.reconstruct(id, AssignmentName, contentUrl);

      expect(assignment.id).toBe(id);
      expect(assignment.name).toBe(AssignmentName);
      expect(assignment.content_url).toBe(contentUrl);
    });
  });

  describe("changeName", () => {
    it("名前を変更できる", () => {
      const initialName = "before change";
      const updatedName = "after change";
      const contentUrl = "https://example.com";

      const assignment = Assignment.create(initialName, contentUrl);
      assignment.changeName(updatedName);

      expect(assignment.name).toBe(updatedName);
    });

    it("名前が未入力の場合、エラー出力", () => {
      const contentUrl = "https://example.com";
      const assignment = Assignment.create("Valid Name", contentUrl);

      // 空文字への変更はエラーになること
      expect(() => {
        assignment.changeName("");
      }).toThrow("課題名が未入力です。");
    });
  });
});
