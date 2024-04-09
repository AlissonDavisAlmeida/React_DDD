import { faker } from "@faker-js/faker/locale/pt_BR";
import { type FieldValidation } from "../protocols/field-validation";
import { ValidationComposite } from "./validation-composite";

interface SutTypes {
  sut: ValidationComposite
  fieldName: string
  fieldsValidationsSpy: FieldValidationSpy[]
}
class FieldValidationSpy implements FieldValidation {
  public error: Error | null = null;
  constructor (public readonly fieldName: string) {}
  validate (value: string) {
    return this.error;
  }
}

const makeFieldValidation = (fieldName: string): FieldValidationSpy => {
  return new FieldValidationSpy(fieldName);
};

function makeSut (): SutTypes {
  const fieldName = faker.database.column();
  const fieldValidationSpy = makeFieldValidation(fieldName);
  const fieldValidationSpy2 = makeFieldValidation(fieldName);
  const fieldsValidationsSpy = [fieldValidationSpy, fieldValidationSpy2];
  fieldValidationSpy2.error = new Error("any_error");
  const sut = new ValidationComposite(fieldsValidationsSpy);

  return {
    sut,
    fieldName,
    fieldsValidationsSpy
  };
}

describe("ValidationComposite", () => {
  test("should return error if any validation fails", () => {
    const { sut, fieldName } = makeSut();

    const error = sut.validate(fieldName, faker.lorem.word());

    expect(error).toBe("any_error");
  });
});
