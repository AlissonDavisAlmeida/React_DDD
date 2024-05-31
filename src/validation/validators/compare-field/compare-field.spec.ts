import { CompareFieldError } from "@/validation/errors/compare-field.error";
import { CompareFieldValidation } from "./compare-field";

const makeSut = (): CompareFieldValidation => {
  return new CompareFieldValidation("field", "fieldToCompare");
};

describe("CompareFieldValidation", () => {
  test("should return CompareFieldError if validation fails", () => {
    const sut = makeSut();
    const error = sut.validate({ field: "invalid_field" });
    expect(error).toEqual(new CompareFieldError());
  });

  test("should return null if validation succeeds", () => {
    const sut = makeSut();
    const error = sut.validate({ field: "field_value", fieldToCompare: "field_value" });
    expect(error).toBeNull();
  });
});
