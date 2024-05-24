import { ValidationComposite } from "@/validation/composite/validation-composite";
import { makeSignupValidatorFactory } from "./signup-validator-factory";
import { ValidationBuilder } from "@/validation/builder/validation-builder";

interface SutTypes {
  sut: ValidationComposite
}

const makeSut = (): SutTypes => {
  const loginValidationComposite = makeSignupValidatorFactory();

  return {
    sut: loginValidationComposite
  };
};

describe("LoginValidatorFactory", () => {
  test("should compose ValidationComposite with correct validations", () => {
    const { sut } = makeSut();

    expect(sut).toEqual(new ValidationComposite([
      ...ValidationBuilder.field("name").required().min(5).build(),
      ...ValidationBuilder.field("email").required().email().build(),
      ...ValidationBuilder.field("password").required().min(5).build(),
      ...ValidationBuilder.field("passwordConfirmation").required().min(5).build()
    ]));
  });
});
