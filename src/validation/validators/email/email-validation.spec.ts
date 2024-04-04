import { InvalidFieldError } from "@/validation/errors/invalid-field.error";
import { EmailValidation } from "./email-validation";

const CONSTANTS = {
  email: "email"
};

const invalidEmailError = new InvalidFieldError(CONSTANTS.email);

interface SutTypes {
  sut: EmailValidation
}

function makeSut (): SutTypes {
  return {
    sut: new EmailValidation(CONSTANTS.email)
  };
}

describe("Email Validation", () => {
  test("should return error if email is invalid", () => {
    const { sut } = makeSut();

    const error = sut.validate("invalid_email");

    expect(error).toEqual(invalidEmailError);
  });
});
