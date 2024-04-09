import { type FieldValidation } from "../protocols/field-validation";
import { RequireFieldValidation } from "../validators/required-field/required-field-validation";

export class ValidationBuilder {
  private constructor (
    private readonly fieldName: string,
    private readonly validations: FieldValidation[] = []
  ) { }

  static field (fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName);
  }

  required (): ValidationBuilder {
    const requiredValidation = new RequireFieldValidation(this.fieldName);
    this.validations.push(requiredValidation);
    return this;
  }

  build (): FieldValidation[] {
    return this.validations;
  }
}
