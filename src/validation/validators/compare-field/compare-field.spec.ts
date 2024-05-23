import { CompareFieldError } from "@/validation/errors/compare-field.error";
import { CompareFieldValidation } from "./compare-field";

const makeSut = (): CompareFieldValidation => {
  return new CompareFieldValidation("field", "field_value");
};

describe("CompareFieldValidation", () => {
  test("should return CompareFieldError if validation fails", () => {
    const sut = makeSut();
    const error = sut.validate("invalid_field");
    expect(error).toEqual(new CompareFieldError());
  });

  test("should return null if validation succeeds", () => {
    const sut = makeSut();
    const error = sut.validate("field_value");
    expect(error).toBeNull();
  });
});
