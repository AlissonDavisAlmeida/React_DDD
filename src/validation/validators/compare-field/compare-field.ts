import { CompareFieldError } from "@/validation/errors/compare-field.error";
import { type FieldValidation } from "@/validation/protocols/field-validation";

export class CompareFieldValidation implements FieldValidation {
  constructor (
    public readonly fieldName: string,
    private readonly fieldNameToCompare: string
  ) { }

  validate (input: Record<string, any>): Error | null {
    return input[this.fieldName] !== input[this.fieldNameToCompare] ? new CompareFieldError() : null;
  }
}
