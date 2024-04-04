import { RequireFieldError } from "@/validation/errors/required-field.error";
import { type FieldValidation } from "@/validation/protocols/field-validation";

export class RequireFieldValidation implements FieldValidation {
  constructor (public readonly fieldName: string) { }

  validate (value: string): RequireFieldError | null {
    return value ? null : new RequireFieldError(this.fieldName);
  }
}
