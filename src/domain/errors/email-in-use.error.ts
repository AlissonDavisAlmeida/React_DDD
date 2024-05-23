export class EmailInUseError extends Error {
  constructor (message?: string) {
    super(message || "Esse e-mail já está em uso");
    this.name = EmailInUseError.name;
  }
}
