import React, { type FC, useState, useEffect } from 'react';
import styles from './login-styles.scss';
import { LoginHeader, Footer, Input, StatusForm } from '@/presentation/components';
import { FormContext, type FormContextProps } from '@/presentation/context/form/form-context';
import { type Validation } from '@/presentation/protocols/validation';

interface LoginProps {
  validation?: Validation
}

export const Login: FC<LoginProps> = ({ validation }) => {
  const [state, setState] = useState<FormContextProps>({
    isLoading: false,
    errorMessage: '',
    inputError: {
      email: '',
      password: ''
    },
    inputValue: {
      email: '',
      password: ''
    }
  });

  useEffect(() => {
    if (state.inputValue) {
      const errorMessage = validation?.validate('email', state.inputValue.email);

	  if (errorMessage) {
        setState((old) => ({
          ...old,
          inputError: {
            ...old.inputError,
            email: errorMessage
          }
        }));
      }
    }
  }, [state.inputValue?.email]);

  useEffect(() => {
    if (state.inputValue) {
      const passwordError = validation?.validate('password', state.inputValue.password);

	  if (passwordError) {
        setState((old) => ({
		  ...old,
		  inputError: {
            ...old.inputError,
            password: passwordError
		  }
        }));
      }
    }
  }, [state.inputValue?.password]);

  return (
	<div className={styles.login}>
		<LoginHeader />

		<FormContext.Provider value={{
			  ...state,
			  setState
		}}
		>
			<form className={styles.form}>
				<h2>Login</h2>

				<Input
					type='email'
					name='email'
					placeholder="Digite seu email"
				/>

				<Input
					type='password'
					name='password'
					placeholder="Digite sua senha"
				/>

				<button
					className={styles.submit}
					type="submit"
					data-testid="submit"
					disabled
				>
					Entrar
				</button>

				<span className={styles.link}>Criar conta</span>

				<StatusForm />
			</form>
		</FormContext.Provider>

		<Footer />
	</div>
  );
};
