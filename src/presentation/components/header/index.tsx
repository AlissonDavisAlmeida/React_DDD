import React from "react";
import { LogoTip } from "../logo";
import styles from "./header-styles.scss";

export const Header = React.memo(() => {
  return (
	<header className={styles.headerWrap}>
		<div className={styles.headerContent}>
			<LogoTip />

			<div className={styles.logoutWrap}>
				<span>Alisson</span>

				<a href="#">Sair</a>
			</div>
		</div>
	</header>
  );
});
