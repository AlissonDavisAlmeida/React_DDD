import React, { useState } from 'react';
import styles from './login-styles.scss';
import { LoginHeader, Footer, Input, StatusForm } from '@/presentation/components';
import { type ErrorFormContextState, FormContext, type StatusFormContextProps } from '@/presentation/context/form/form-context';

export const Login = () => {
  const [state] = useState<StatusFormContextProps>({
    isLoading: false
  });

  const [errorState] = useState<ErrorFormContextState>({
    errorMessage: '',
    inputError: {
      email: 'Campo obrigatório',
      password: 'Campo obrigatório'
    }
  });

  return (
	<div className={styles.login}>
		<LoginHeader />

		<FormContext.Provider value={{
			  ...state,
			  ...errorState
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
