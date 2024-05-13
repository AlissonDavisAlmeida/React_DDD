import { ValidationBuilder } from "@/validation/builder/validation-builder";
import { ValidationComposite } from "@/validation/composite/validation-composite";

export const makeLoginValidatorFactory = (): ValidationComposite => {
  const validationComposite = new ValidationComposite([
    ...ValidationBuilder.field("email").required().email().build(),
    ...ValidationBuilder.field("password").required().min(5).build()
  ]);

  return validationComposite;
};
