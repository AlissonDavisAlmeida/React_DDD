import { createContext } from 'react';

export interface ErrorFormContextState {
  errorMessage?: string
  inputError?: Record<string, string>
}

export interface StatusFormContextProps {
  isLoading?: boolean

}

export const FormContext = createContext<StatusFormContextProps & ErrorFormContextState>({});
