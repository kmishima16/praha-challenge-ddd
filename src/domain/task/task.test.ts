import { describe, expect, it } from "vitest";
import { Task } from "./task";

describe("Task Entity", () => {
  describe("create", () => {
    it("Taskを作成できる", () => {
      const taskName = "特大課題：プラハチャレンジをDDDで実装してみる";
      const contentUrl =
        "https://separated-rover-67e.notion.site/DDD-03e9d01f643244f0ad9d80f148a46563";

      const task = Task.create(taskName, contentUrl);

      expect(task).toBeInstanceOf(Task);
      expect(task.id).toBeDefined(); // id採番が正しくできているか
      expect(typeof task.id).toBe("string");
      expect(task.name).toBe(taskName);
      expect(task.content_url).toBe(contentUrl);
    });

    it("nameが空白の場合、エラーを返す", () => {
      expect(() => {
        Task.create("", "https://example.com/spec");
      }).toThrow("課題名が未入力です。");
    });
  });

  describe("reconstruct", () => {
    it("Taskのreconstructができる", () => {
      const id = "01ARZ3ABC"; //
      const taskName = "データベースから取得したタスク";
      const contentUrl = "https://example.com/db-spec";

      const task = Task.reconstruct(id, taskName, contentUrl);

      expect(task).toBeInstanceOf(Task);
      expect(task.id).toBe(id);
      expect(task.name).toBe(taskName);
      expect(task.content_url).toBe(contentUrl);
    });
  });

  describe("changeName", () => {
    it("名前を変更できる", () => {
      const initialName = "before change";
      const updatedName = "after change";
      const contentUrl = "https://example.com";

      const task = Task.create(initialName, contentUrl);
      task.changeName(updatedName);

      expect(task.name).toBe(updatedName);
    });

    it("名前が未入力の場合、エラー出力", () => {
      const contentUrl = "https://example.com";
      const task = Task.create("Valid Name", contentUrl);

      // 空文字への変更はエラーになること
      expect(() => {
        task.changeName("");
      }).toThrow("課題名が未入力です。");
    });
  });
});
