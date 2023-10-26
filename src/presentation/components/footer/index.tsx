import { memo } from 'react';
import styles from './footer-styles.scss';

export const Footer = memo(() => {
  return (
	<footer className={styles.footer} />
  );
});
