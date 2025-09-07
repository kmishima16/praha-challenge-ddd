import { describe, expect, it } from "vitest";
import { MailAddress } from "./mail-address";

describe("MailAddress ValueObject", () => {
  describe("create", () => {
    it("有効なメールアドレスでMailAddressインスタンスを作成できる", () => {
      const validEmail = "test@example.com";
      const mailAddress = MailAddress.create(validEmail);
      expect(mailAddress).toBeInstanceOf(MailAddress);
      expect(mailAddress.getAddress()).toBe(validEmail);
    });

    it("無効なメールアドレス形式の場合、エラーをスローする", () => {
      const invalidEmails = [
        "plain address",
        "#@%^%#$@#$@#.com",
        "@example.com",
        "Joe Smith <email@example.com>",
        "email.example.com",
        "email@example@example.com",
        "email@example",
        "",
      ];

      for (const email of invalidEmails) {
        expect(() => MailAddress.create(email)).toThrow(
          "無効な形式のメールアドレスです。",
        );
      }
    });
  });

  describe("getAddress", () => {
    it("メールアドレスの文字列を返す", () => {
      const email = "user@domain.co.jp";
      const mailAddress = MailAddress.create(email);
      expect(mailAddress.getAddress()).toBe(email);
    });
  });

  describe("equals", () => {
    it("同じ値を持つ別のMailAddressインスタンスと比較してtrueを返す", () => {
      const email = "test@example.com";
      const mailAddress1 = MailAddress.create(email);
      const mailAddress2 = MailAddress.create(email);
      expect(mailAddress1.equals(mailAddress2)).toBe(true);
    });

    it("異なる値を持つ別のMailAddressインスタンスと比較してfalseを返す", () => {
      const mailAddress1 = MailAddress.create("test1@example.com");
      const mailAddress2 = MailAddress.create("test2@example.com");
      expect(mailAddress1.equals(mailAddress2)).toBe(false);
    });
  });
});
