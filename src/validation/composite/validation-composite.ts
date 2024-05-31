import { type Validation } from "@/presentation/protocols/validation";
import { type FieldValidation } from "@/validation/protocols/field-validation";

export class ValidationComposite implements Validation {
  constructor (
    private readonly fieldValidations: FieldValidation[]
  ) { }

  validate (fieldName: string, input: Record<string, any>): string | null {
    const validations = this.fieldValidations.filter(validation => validation.fieldName === fieldName);
    for (const validation of validations) {
      const error = validation.validate(input);

      if (error) {
        return error.message;
      }
    }
    return null;
  }
}
