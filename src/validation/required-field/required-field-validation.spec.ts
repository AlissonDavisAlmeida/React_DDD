import { RequireFieldError } from "../errors/required-field.error";
import { RequireFieldValidation } from "./required-field-validation";
import { faker } from "@faker-js/faker/locale/pt_BR";

describe("RequireFieldValidation", () => {
  test("should return error if field is empty", () => {
    const sut = new RequireFieldValidation("email");
    const error = sut.validate("");

    expect(error).toEqual(new RequireFieldError("email"));
  });

  test("should return falsy if field isn't empty", () => {
    const sut = new RequireFieldValidation("email");
    const error = sut.validate(faker.lorem.word());

    expect(error).toBeNull();
  });
});
