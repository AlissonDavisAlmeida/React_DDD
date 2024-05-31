import { ValidationBuilder } from "@/validation/builder/validation-builder";
import { ValidationComposite } from "@/validation/composite/validation-composite";

export const makeSignupValidatorFactory = (): ValidationComposite => {
  const validationComposite = new ValidationComposite([
    ...ValidationBuilder.field("name").required().min(5).build(),
    ...ValidationBuilder.field("email").required().email().build(),
    ...ValidationBuilder.field("password").required().min(5).sameAs("passwordConfirmation").build(),
    ...ValidationBuilder.field("passwordConfirmation").required().min(5).build()
  ]);

  return validationComposite;
};
