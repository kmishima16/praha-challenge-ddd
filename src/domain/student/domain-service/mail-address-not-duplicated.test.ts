import { beforeEach, describe, expect, it, vi } from "vitest";
import { Student } from "../student";
import type { IStudentRepository } from "../student-repository";
import { MailAddress } from "../value-object/mail-address";
import { MailAddressNotDuplicated } from "./mail-address-not-duplicated";

const mockStudentRepository: IStudentRepository = {
  findByEmail: vi.fn(),
  delete: vi.fn(),
  findAll: vi.fn(),
  save: vi.fn(),
  findById: vi.fn(),
};

describe("MailAddressNotDuplicated", () => {
  beforeEach(() => {
    vi.mocked(mockStudentRepository.findByEmail).mockClear(); // モックの初期化
  });

  it("メールアドレスが重複していなければtrue", async () => {
    vi.mocked(mockStudentRepository.findByEmail).mockResolvedValue(null);

    const emailService = new MailAddressNotDuplicated(mockStudentRepository);
    const email = MailAddress.create("new-user@example.com");
    const result = await emailService.invoke(email);

    expect(result).toBe(true);
  });

  it("メールアドレスが重複していればfalse", async () => {
    const existingEmail = MailAddress.create("existing-user@example.com");
    const existingStudent = Student.reconstruct(
      "some-id",
      "苗字",
      "名前",
      existingEmail,
      "在籍中",
    );

    vi.mocked(mockStudentRepository.findByEmail).mockResolvedValue(
      existingStudent,
    );

    const emailService = new MailAddressNotDuplicated(mockStudentRepository);
    const result = await emailService.invoke(existingEmail);

    expect(result).toBe(false);
  });
});
