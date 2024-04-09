import { InvalidFieldError } from "@/validation/errors/invalid-field.error";
import { MinLengthValidation } from "./min-length-validation";
import { faker } from "@faker-js/faker/locale/pt_BR";

interface SutTypes {
  sut: MinLengthValidation
}

const CONSTANTS = {
  fieldName: "any_field"
};

const makeSut = (): SutTypes => {
  const sut = new MinLengthValidation(CONSTANTS.fieldName, 5);
  return {
    sut
  };
};

describe("MinLengthValidation", () => {
  test("should return error if value is invalid", () => {
    const { sut } = makeSut();

    const error = sut.validate(faker.lorem.word({ length: 4 }));

    expect(error).toEqual(new InvalidFieldError(CONSTANTS.fieldName));
  });

  test("should return null if value is valid", () => {
    const { sut } = makeSut();

    const error = sut.validate(faker.lorem.word({ length: 5 }));

    expect(error).toBeNull();
  });
});
