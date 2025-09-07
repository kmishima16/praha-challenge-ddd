export class MailAddress {
  #address: string;

  private constructor(address: string) {
    if (!this.isValidEmail(address)) {
      throw new Error("無効な形式のメールアドレスです。");
    }
    this.#address = address;
  }

  public static create(address: string): MailAddress {
    return new MailAddress(address);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public getAddress(): string {
    return this.#address;
  }

  public equals(other: MailAddress): boolean {
    return this.#address === other.getAddress();
  }
}
