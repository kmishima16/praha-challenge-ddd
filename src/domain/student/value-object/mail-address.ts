export class MailAddress {
  private readonly value: string;

  private constructor(value: string) {
    if (!this.isValidEmail(value)) {
      throw new Error("無効な形式のメールアドレスです。");
    }
    this.value = value;
  }

  public static create(value: string): MailAddress {
    return new MailAddress(value);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: MailAddress): boolean {
    return this.value === other.getValue();
  }
}
