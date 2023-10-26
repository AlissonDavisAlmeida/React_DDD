import { type FC } from 'react';
import styles from './login-styles.scss';
import { LoginHeader, Footer, Input, StatusForm } from '@/presentation/components';

export const Login: FC = () => {
  return (
	<div className={styles.login}>
		<LoginHeader />

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
			>
				Entrar
			</button>

			<span className={styles.link}>Criar conta</span>

			<StatusForm errorMessage='Erro'/>
		</form>

		<Footer />
	</div>
  );
};
