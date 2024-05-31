import { RequireFieldError } from "../../errors/required-field.error";
import { RequireFieldValidation } from "./required-field-validation";
import { faker } from "@faker-js/faker/locale/pt_BR";

interface SutTypes {
  sut: RequireFieldValidation
  fieldName: string
}

const makeSut = (): SutTypes => {
  const fieldName = faker.database.column();
  return {
    sut: new RequireFieldValidation(fieldName),
    fieldName
  };
};
describe("RequireFieldValidation", () => {
  test("should return error if field is empty", () => {
    const { sut, fieldName } = makeSut();
    const error = sut.validate({ [fieldName]: "" });

    expect(error).toEqual(new RequireFieldError(fieldName));
  });

  test("should return falsy if field isn't empty", () => {
    const { sut, fieldName } = makeSut();
    const error = sut.validate({ [fieldName]: faker.lorem.word() });

    expect(error).toBeNull();
  });
});
