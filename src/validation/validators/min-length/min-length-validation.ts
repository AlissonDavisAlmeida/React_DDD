import { InvalidFieldError } from "@/validation/errors/invalid-field.error";
import { type FieldValidation } from "@/validation/protocols/field-validation";

export class MinLengthValidation implements FieldValidation {
  constructor (
    public readonly fieldName: string,
    public readonly minLength: number
  ) { }

  validate (value: string) {
    return value.length >= this.minLength ? null : new InvalidFieldError(this.fieldName);
  };
}
