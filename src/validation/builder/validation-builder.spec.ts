import { faker } from "@faker-js/faker/locale/pt_BR";
import { type FieldValidation } from "../protocols/field-validation";
import { RequireFieldValidation } from "../validators/required-field/required-field-validation";

class ValidationBuilder {
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

describe("ValidationBuilder", () => {
  test("should return a required field validation", () => {
    const fieldName = faker.database.column();
    const validations = ValidationBuilder.field(fieldName).required().build();

    expect(validations).toEqual([new RequireFieldValidation(fieldName)]);
  });
});
