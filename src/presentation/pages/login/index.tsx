import React, { useState } from 'react';
import styles from './login-styles.scss';
import { LoginHeader, Footer, Input, StatusForm } from '@/presentation/components';
import { FormContext } from '@/presentation/context/form/form-context';

interface INITIAL_STATE {
  isLoading: boolean
  errorMessage: string
}

export const Login = () => {
  const [state] = useState<INITIAL_STATE>({
    isLoading: false,
    errorMessage: ''
  });

  return (
	<div className={styles.login}>
		<LoginHeader />

		<FormContext.Provider value={state}>
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
