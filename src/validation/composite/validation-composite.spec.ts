import { faker } from "@faker-js/faker/locale/pt_BR";
import { type FieldValidation } from "../protocols/field-validation";
import { ValidationComposite } from "./validation-composite";

const CONSTANTS = {
  error_message: "any_error"
};

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
  const sut = new ValidationComposite(fieldsValidationsSpy);

  return {
    sut,
    fieldName,
    fieldsValidationsSpy
  };
}

describe("ValidationComposite", () => {
  test("should return error if any validation fails", () => {
    const { sut, fieldName, fieldsValidationsSpy } = makeSut();

    fieldsValidationsSpy[1].error = new Error(CONSTANTS.error_message);

    const error = sut.validate(fieldName, faker.lorem.word());

    expect(error).toBe(CONSTANTS.error_message);
  });

  test("should return the first error if more than one validation fails", () => {
    const { sut, fieldName, fieldsValidationsSpy } = makeSut();

    fieldsValidationsSpy[0].error = new Error(CONSTANTS.error_message);
    fieldsValidationsSpy[1].error = new Error(faker.lorem.word());

    const error = sut.validate(fieldName, faker.lorem.word());

    expect(error).toBe(CONSTANTS.error_message);
  });
});
