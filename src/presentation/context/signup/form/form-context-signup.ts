import { createContext } from "react";

export interface FormContextSignupProps {
  isLoading?: boolean
  errorMessage?: string
  inputError?: {
    name?: string | null
    email?: string | null
    password?: string | null
    passwordConfirmation?: string | null
  }
  setState?: React.Dispatch<React.SetStateAction<FormContextSignupProps>>
  inputValue?: {
    name?: string
    email?: string
    password?: string
    passwordConfirmation?: string
  }
}

export const FormContextSignup = createContext<FormContextSignupProps>({});
