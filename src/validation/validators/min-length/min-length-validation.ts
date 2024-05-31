import { InvalidFieldError } from "@/validation/errors/invalid-field.error";
import { type FieldValidation } from "@/validation/protocols/field-validation";

export class MinLengthValidation implements FieldValidation {
  constructor (
    public readonly fieldName: string,
    public readonly minLength: number
  ) { }

  validate (input: Record<string, any>): Error | null {
    return input[this.fieldName]?.length < this.minLength ? new InvalidFieldError(this.fieldName) : null;
  };
}
