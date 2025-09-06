import { describe, expect, it } from "vitest";
import { Task } from "./task";

describe("Task Entity", () => {
  const studentId = "student_01";
  const taskId = "task_01";

  describe("create", () => {
    it("Taskを作成できる", () => {
      const assignment = Task.create(studentId, taskId);
      const status = "未着手";

      expect(assignment).toBeInstanceOf(Task);
      expect(assignment.id).toBeDefined();
      expect(typeof assignment.id).toBe("string");
      expect(assignment.studentId).toBe(studentId);
      expect(assignment.taskId).toBe(taskId);
      expect(assignment.status).toBe(status);
    });
  });

  describe("reconstruct", () => {
    it("Taskを再構成できる", () => {
      const id = "assignment01";
      const status = "完了";

      const assignment = Task.reconstruct(id, studentId, taskId, status);

      expect(assignment).toBeInstanceOf(Task);
      expect(assignment.id).toBe(id);
      expect(assignment.studentId).toBe(studentId);
      expect(assignment.taskId).toBe(taskId);
      expect(assignment.status).toBe(status);
    });
  });

  describe("changeStatus", () => {
    it("進捗ステータスを変更できる", () => {
      const assignment = Task.create(studentId, taskId);
      expect(assignment.status).toBe("未着手");

      assignment.changeStatus("レビュー待ち");
      expect(assignment.status).toBe("レビュー待ち");
    });
  });
});
