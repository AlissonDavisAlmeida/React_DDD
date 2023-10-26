import { memo } from 'react';
import { LogoTip } from '../logo';
import styles from './login-header-styles.scss';

export const LoginHeader = memo(() => {
  return (
	<header className={styles.header}>
		<LogoTip />

		<h1>4Dev - Enquetes para programadores</h1>
	</header>
  );
});
