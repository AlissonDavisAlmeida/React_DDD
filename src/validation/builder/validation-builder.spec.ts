import { faker } from "@faker-js/faker/locale/pt_BR";
import { EmailValidation, MinLengthValidation, RequireFieldValidation } from "@/validation/validators";
import { ValidationBuilder as sut } from "./validation-builder";

describe("ValidationBuilder", () => {
  test("should return a required field validation", () => {
    const fieldName = faker.database.column();
    const validations = sut.field(fieldName).required().build();

    expect(validations).toEqual([new RequireFieldValidation(fieldName)]);
  });

  test("should return an email validation", () => {
    const fieldName = faker.database.column();
    const validations = sut.field(fieldName).email().build();

    expect(validations).toEqual([new EmailValidation(fieldName)]);
  });

  test("should return a minLength validation", () => {
    const fieldName = faker.database.column();
    const validations = sut.field(fieldName).min(5).build();

    expect(validations).toEqual([new MinLengthValidation(fieldName, 5)]);
  });

  test("should return a list of validations", () => {
    const fieldName = faker.database.column();
    const validations = sut.field(fieldName).required().min(5).email().build();

    expect(validations).toEqual([
      new RequireFieldValidation(fieldName),
      new MinLengthValidation(fieldName, 5),
      new EmailValidation(fieldName)
    ]);
  });
});
