import { RequireFieldError } from "../errors/required-field.error";
import { type FieldValidation } from "../protocols/field-validation";

export class RequireFieldValidation implements FieldValidation {
  constructor (public readonly fieldName: string) { }

  validate (value: string): RequireFieldError | null {
    return value ? null : new RequireFieldError(this.fieldName);
  }
}
