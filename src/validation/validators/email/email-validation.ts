import { InvalidFieldError } from "@/validation/errors/invalid-field.error";
import { type FieldValidation } from "@/validation/protocols/field-validation";

export class EmailValidation implements FieldValidation {
  constructor (public readonly fieldName: string) { }

  validate (value: string) {
    return new InvalidFieldError(this.fieldName);
  };
}
