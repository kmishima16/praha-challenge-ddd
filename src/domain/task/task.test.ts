import { describe, expect, it } from "vitest";
import { Task } from "./task";

describe("Task Entity", () => {
  const studentId = "student_01";
  const assignmentId = "task_01";

  describe("create", () => {
    it("Taskを作成できる", () => {
      const task = Task.create(studentId, assignmentId);
      const status = "未着手";

      expect(task).toBeInstanceOf(Task);
      expect(task.id).toBeDefined();
      expect(typeof task.id).toBe("string");
      expect(task.studentId).toBe(studentId);
      expect(task.assignmentId).toBe(assignmentId);
      expect(task.status).toBe(status);
    });
  });

  describe("reconstruct", () => {
    it("Taskを再構成できる", () => {
      const id = "assignment01";
      const status = "完了";

      const task = Task.reconstruct(id, studentId, assignmentId, status);

      expect(task).toBeInstanceOf(Task);
      expect(task.id).toBe(id);
      expect(task.studentId).toBe(studentId);
      expect(task.assignmentId).toBe(assignmentId);
      expect(task.status).toBe(status);
    });
  });

  describe("changeStatus", () => {
    it("進捗ステータスを変更できる", () => {
      const task = Task.create(studentId, assignmentId);
      expect(task.status).toBe("未着手");

      task.changeStatus("レビュー待ち");
      expect(task.status).toBe("レビュー待ち");
    });
  });
});
