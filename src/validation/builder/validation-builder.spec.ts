import { faker } from "@faker-js/faker/locale/pt_BR";
import { RequireFieldValidation } from "@/validation/validators";
import { ValidationBuilder as sut } from "./validation-builder";

describe("ValidationBuilder", () => {
  test("should return a required field validation", () => {
    const fieldName = faker.database.column();
    const validations = sut.field(fieldName).required().build();

    expect(validations).toEqual([new RequireFieldValidation(fieldName)]);
  });
});
