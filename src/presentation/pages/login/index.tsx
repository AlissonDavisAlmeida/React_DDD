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
      setState((old) => ({
        ...old,
        inputError: {
          ...old.inputError,
          email: validation?.validate('email', state.inputValue?.email as string),
          password: validation?.validate('password', state.inputValue?.password as string)
        }
      }));
    }
  }, [state.inputValue?.email, state.inputValue?.password]);

  const isInvalidForm = (): boolean => {
    return !!state.inputError?.email || !!state.inputError?.password;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (isInvalidForm() || state.isLoading) {
      return;
    }
    console.log('submit');

    setState((old) => ({
      ...old,
      isLoading: true
    }));
  };

  return (
	<div className={styles.login}>
		<LoginHeader />

		<FormContext.Provider value={{
			  ...state,
			  setState
		}}
		>
			<form
				className={styles.form}
				onSubmit={handleSubmit}
			>
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
					disabled={isInvalidForm()}
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
