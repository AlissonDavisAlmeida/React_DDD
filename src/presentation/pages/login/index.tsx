import { type FC } from 'react';
import styles from './login-styles.scss';
import { LoginHeader } from '@/presentation/components/login-header';
import { Footer } from '@/presentation/components/footer';
import { Input } from '@/presentation/components/input';
import { StatusForm } from '@/presentation/components/status-form';

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
