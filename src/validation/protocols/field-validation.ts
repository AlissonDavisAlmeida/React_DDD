export interface FieldValidation {
  fieldName?: string
  validate: (input: Record<string, any>) => Error | null

}
