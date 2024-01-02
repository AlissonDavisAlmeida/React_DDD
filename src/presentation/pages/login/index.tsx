import React, { useState } from 'react';
import styles from './login-styles.scss';
import { LoginHeader, Footer, Input, StatusForm } from '@/presentation/components';
import { FormContext, type FormContextProps } from '@/presentation/context/form/form-context';

export const Login = () => {
  const [state] = useState<FormContextProps>({
    isLoading: false,
    errorMessage: '',
    inputError: {
      email: 'Campo obrigatório',
      password: 'Campo obrigatório'
    }
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
