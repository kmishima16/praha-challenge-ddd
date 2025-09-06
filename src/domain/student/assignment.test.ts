import { describe, expect, it } from "vitest";
import { Assignment} from "./assignment";

describe("Assignment Entity", () => {
  const studentId = "student_01";
  const taskId = "task_01";

  describe("create", () => {
    it("Assignmentを作成できる", () => {
      const assignment = Assignment.create(studentId, taskId);
      const status = "未着手";

      expect(assignment).toBeInstanceOf(Assignment);
      expect(assignment.id).toBeDefined();
      expect(typeof assignment.id).toBe("string");
      expect(assignment.studentId).toBe(studentId);
      expect(assignment.taskId).toBe(taskId);
      expect(assignment.status).toBe(status);
    });
  });

  describe("reconstruct", () => {
    it("Assignmentを再構成できる", () => {
      const id = "assignment01";
      const status = "完了";

      const assignment = Assignment.reconstruct(id, studentId, taskId, status);

      expect(assignment).toBeInstanceOf(Assignment);
      expect(assignment.id).toBe(id);
      expect(assignment.studentId).toBe(studentId);
      expect(assignment.taskId).toBe(taskId);
      expect(assignment.status).toBe(status);
    });
  });

  describe("changeStatus", () => {
    it("進捗ステータスを変更できる", () => {
      const assignment = Assignment.create(studentId, taskId);
      expect(assignment.status).toBe("未着手");

      assignment.changeStatus("レビュー待ち");
      expect(assignment.status).toBe("レビュー待ち");
    });
  });
});