import { createContext } from 'react';

export interface FormContextProps {
  isLoading?: boolean
  errorMessage?: string
  inputError?: Record<string, string>
  setState?: React.Dispatch<React.SetStateAction<FormContextProps>>
  inputValue?: Record<string, string>
}

export const FormContext = createContext<FormContextProps>({});
