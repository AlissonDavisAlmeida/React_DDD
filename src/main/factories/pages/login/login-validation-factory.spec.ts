import { ValidationComposite } from "@/validation/composite/validation-composite";
import { makeLoginValidatorFactory } from "./login-validator-factory";
import { ValidationBuilder } from "@/validation/builder/validation-builder";

interface SutTypes {
  sut: ValidationComposite
}

const makeSut = (): SutTypes => {
  const loginValidationComposite = makeLoginValidatorFactory();

  return {
    sut: loginValidationComposite
  };
};

describe("LoginValidatorFactory", () => {
  test("should compose ValidationComposite with correct validations", () => {
    const { sut } = makeSut();

    expect(sut).toEqual(new ValidationComposite([
      ...ValidationBuilder.field("email").required().email().build(),
      ...ValidationBuilder.field("password").required().min(5).build()
    ]));
  });
});
