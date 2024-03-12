export class RequireFieldError extends Error {
  constructor (fieldName: string) {
    super(`${fieldName} is required`);
    this.name = RequireFieldError.name;
  }
}
