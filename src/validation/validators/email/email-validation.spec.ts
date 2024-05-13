import { InvalidFieldError } from "@/validation/errors/invalid-field.error";
import { EmailValidation } from "./email-validation";
import { faker } from "@faker-js/faker/locale/pt_BR";

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

    const error = sut.validate(faker.lorem.word());

    expect(error).toEqual(invalidEmailError);
  });

  test("should return falsy if email is valid", () => {
    const { sut } = makeSut();
    const email = faker.internet.email();
    const error = sut.validate(email);

    expect(error).toBeFalsy();
  });

  test("should return falsy if email is empty", () => {
    const { sut } = makeSut();

    const error = sut.validate("");

    expect(error).toBeFalsy();
  });
});
