import { createContext } from "react";

export interface FormContextLoginProps {
  isLoading?: boolean
  errorMessage?: string
  inputError?: {
    email?: string | null
    password?: string | null
  }
  setState?: React.Dispatch<React.SetStateAction<FormContextLoginProps>>
  inputValue?: {
    email?: string
    password?: string
  }
}

export const FormContextLogin = createContext<FormContextLoginProps>({});
