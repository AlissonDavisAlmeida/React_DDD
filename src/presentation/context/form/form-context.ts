import { createContext } from 'react';

export interface FormContextProps {
  isLoading?: boolean
  errorMessage?: string
  inputError?: {
    email?: string
    password?: string
  }
  setState?: React.Dispatch<React.SetStateAction<FormContextProps>>
  inputValue?: {
    email?: string
    password?: string
  }
}

export const FormContext = createContext<FormContextProps>({});
