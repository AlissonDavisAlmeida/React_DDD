import { type FieldValidation } from "../protocols/field-validation";
import { EmailValidation, MinLengthValidation } from "../validators";
import { RequireFieldValidation } from "@/validation/validators";
import { CompareFieldValidation } from "../validators/compare-field/compare-field";

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

  email (): ValidationBuilder {
    const emailValidation = new EmailValidation(this.fieldName);
    this.validations.push(emailValidation);
    return this;
  }

  min (length: number): ValidationBuilder {
    const minLengthValidation = new MinLengthValidation(this.fieldName, length);
    this.validations.push(minLengthValidation);
    return this;
  }

  sameAs (fieldToCompare: string): ValidationBuilder {
    const compareFields = new CompareFieldValidation(this.fieldName, fieldToCompare);
    this.validations.push(compareFields);
    return this;
  }

  build (): FieldValidation[] {
    return this.validations;
  }
}
