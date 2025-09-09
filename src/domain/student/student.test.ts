import { describe, expect, it } from "vitest";
import { Student } from "./student";
import type { Task } from "./task";
import { MailAddress } from "./value-object/mail-address";

describe("Student Entity", () => {
  describe("create", () => {
    it("Studentを作成できる", () => {
      const firstName = "山田";
      const lastName = "太郎";
      const email = MailAddress.create("test@example.com");
      const status = "在籍中";

      const student = Student.create(firstName, lastName, email);

      expect(student).toBeInstanceOf(Student);
      expect(student.id).toBeDefined();
      expect(typeof student.id).toBe("string");
      expect(student.name).toBe(`${firstName} ${lastName}`);
      expect(student.mailAddress).toBe("test@example.com");
      expect(student.userType).toBe("student");
      expect(student.status).toBe(status);
      expect(student.tasks).toEqual([]);
    });

    it("firstNameが空文字の場合、エラーを返す", () => {
      const lastName = "太郎";
      const email = MailAddress.create("test@example.com");
      expect(() => {
        Student.create("", lastName, email);
      }).toThrow("苗字が未入力です。");
    });

    it("lastNameが空文字の場合、エラーを返す", () => {
      const firstName = "山田";
      const email = MailAddress.create("test@example.com");
      expect(() => {
        Student.create(firstName, "", email);
      }).toThrow("名前が未入力です。");
    });
  });

  describe("reconstruct", () => {
    it("Studentを再構成できる", () => {
      const id = "abcd1234";
      const firstName = "佐藤";
      const lastName = "花子";
      const email = MailAddress.create("reconstruct@example.com");
      const status = "休会中";

      const student = Student.reconstruct(
        id,
        firstName,
        lastName,
        email,
        status,
      );

      expect(student).toBeInstanceOf(Student);
      expect(student.id).toBe(id);
      expect(student.name).toBe(`${firstName} ${lastName}`);
      expect(student.mailAddress).toBe("reconstruct@example.com");
      expect(student.userType).toBe("student");
      expect(student.status).toBe(status);
      expect(student.tasks).toEqual([]);
    });
  });

  describe("changeStatus", () => {
    it("在籍ステータスを変更できる", () => {
      const student = Student.create(
        "鈴木",
        "一郎",
        MailAddress.create("change@example.com"),
      );

      // 初期ステータスが「在籍中」であることを確認
      expect(student.status).toBe("在籍中");

      // ステータスを「休会中」に変更
      student.changeStatus("休会中");
      expect(student.status).toBe("休会中");

      // ステータスを「退会済」に変更
      student.changeStatus("退会済");
      expect(student.status).toBe("退会済");

      // ステータスを「卒業済」に変更
      student.changeStatus("卒業済");
      expect(student.status).toBe("卒業済");
    });
  });

  describe("assignInitialTasks", () => {
    const mockTask1 = { id: "task1" } as Task;
    const mockTask2 = { id: "task2" } as Task;
    const initialTasks = [mockTask1, mockTask2];

    it("生徒にタスクを割り当てられる", () => {
      const student = Student.create(
        "test",
        "name",
        MailAddress.create("task@example.com"),
      );

      expect(() => student.assignInitialTasks(initialTasks)).not.toThrow();
    });
  });
});
