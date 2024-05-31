import { InvalidFieldError } from "@/validation/errors/invalid-field.error";
import { type FieldValidation } from "@/validation/protocols/field-validation";
import { emailRegex } from "../utils/regex";

export class EmailValidation implements FieldValidation {
  constructor (public readonly fieldName: string) { }

  validate (input: Record<string, any>): Error | null {
    if (input[this.fieldName].trim().length === 0) {
      return null;
    }

    const isvalid = emailRegex.test(input[this.fieldName]);

    if (!isvalid) {
      return new InvalidFieldError(this.fieldName);
    }

    return null;
  };
}
