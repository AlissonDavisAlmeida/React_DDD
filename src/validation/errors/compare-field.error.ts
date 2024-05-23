export class CompareFieldError extends Error {
  constructor () {
    super("Os campos não são iguais");
    this.name = "CompareFieldError";
  }
}
