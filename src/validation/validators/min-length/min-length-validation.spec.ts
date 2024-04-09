import { InvalidFieldError } from "@/validation/errors/invalid-field.error";
import { MinLengthValidation } from "./min-length-validation";

interface SutTypes {
  sut: MinLengthValidation
}

const makeSut = (): SutTypes => {
  const sut = new MinLengthValidation("123", 5);
  return {
    sut
  };
};

describe("MinLengthValidation", () => {
  test("should return error if value is invalid", () => {
    const { sut } = makeSut();

    const error = sut.validate("1234");

    expect(error).toEqual(new InvalidFieldError("123"));
  });
});
