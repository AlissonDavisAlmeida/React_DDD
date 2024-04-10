import { type Validation } from "@/presentation/protocols/validation";
import { type FieldValidation } from "@/validation/protocols/field-validation";

export class ValidationComposite implements Validation {
  constructor (
    private readonly fieldValidations: FieldValidation[]
  ) { }

  validate (fieldName: string, fieldValue: string): string | null {
    const validations = this.fieldValidations.filter(validation => validation.fieldName === fieldName);
    for (const validation of validations) {
      const error = validation.validate(fieldValue);
      if (error) {
        return error.message;
      }
    }
    return null;
  }
}
