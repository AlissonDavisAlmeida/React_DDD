import { createContext } from 'react';

export interface FormContextProps {
  isLoading?: boolean
  errorMessage?: string
  inputError?: Record<string, string>
}

export const FormContext = createContext<FormContextProps>({});
