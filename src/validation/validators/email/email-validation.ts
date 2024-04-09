import { InvalidFieldError } from "@/validation/errors/invalid-field.error";
import { type FieldValidation } from "@/validation/protocols/field-validation";
import { emailRegex } from "../utils/regex";

export class EmailValidation implements FieldValidation {
  constructor (public readonly fieldName: string) { }

  validate (value: string) {
    if (value.trim().length === 0) {
      return null;
    }

    const isvalid = emailRegex.test(value);

    if (!isvalid) {
      return new InvalidFieldError(this.fieldName);
    }

    return null;
  };
}
