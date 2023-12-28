import * as React from 'react';

import { LogoTip } from '../logo';
import styles from './login-header-styles.scss';

export const LoginHeader = React.memo(() => {
  return (
	<header className={styles.header}>
		<LogoTip />

		<h1>4Dev - Enquetes para programadores</h1>
	</header>
  );
});
