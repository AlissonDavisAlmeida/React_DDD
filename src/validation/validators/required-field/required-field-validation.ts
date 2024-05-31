import { RequireFieldError } from "@/validation/errors/required-field.error";
import { type FieldValidation } from "@/validation/protocols/field-validation";

export class RequireFieldValidation implements FieldValidation {
  constructor (public readonly fieldName: string) { }

  validate (input: Record<string, any>): RequireFieldError | null {
    return input[this.fieldName] ? null : new RequireFieldError(this.fieldName);
  }
}
