import { type RequireFieldError } from '../errors/required-field.error';

export interface FieldValidation {
  fieldName: string
  validate: (value: string) => RequireFieldError | null

}
