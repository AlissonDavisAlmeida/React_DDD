import { CompareFieldError } from "@/validation/errors/compare-field.error";
import { type FieldValidation } from "@/validation/protocols/field-validation";

export class CompareFieldValidation implements FieldValidation {
  constructor (
    private readonly fieldValue: string
  ) { }

  validate (value: string): Error | null {
    return value !== this.fieldValue ? new CompareFieldError() : null;
  }
}
