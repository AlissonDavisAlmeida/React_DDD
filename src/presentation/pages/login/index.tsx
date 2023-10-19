import { type FC } from 'react';
import styles from './login-styles.scss';
import { logoImageBase64 } from '@/utils/constants';
import { Spinner } from '@/presentation/components/spinner';

export const Login: FC = () => {
  return (
	<div className={styles.login}>
		<header className={styles.header}>
			<img
				src={logoImageBase64}
				alt=""
			/>

			<h1>4Dev - Enquetes para programadores</h1>
		</header>

		<form className={styles.form}>
			<h2>Login</h2>

			<div className={styles.inputWrap}>
				<input
					type="email"
					name="email"
					placeholder="Digite seu email"
				/>

				<span className={styles.status}>🟠</span>
			</div>

			<div className={styles.inputWrap}>
				<input
					type="password"
					name="password"
					placeholder="Digite sua senha"
				/>

				<span className={styles.status}>🟠</span>
			</div>

			<button
				className={styles.submit}
				type="submit"
			>
				Entrar
			</button>

			<span className={styles.link}>Criar conta</span>

			<div className={styles.errorWrap} >
				<Spinner className={styles.spinner} />

				<span className={styles.error}>Error</span>
			</div>
		</form>

		<footer className={styles.footer} />
	</div>
  );
};
