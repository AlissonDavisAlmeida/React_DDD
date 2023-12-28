import { createContext } from 'react';

interface FormContextProps {
  isLoading?: boolean
  errorMessage?: string
}

export const FormContext = createContext<FormContextProps>({});
