import React from 'react';
import { Spinner } from '../spinner';
import styles from './status-form-styles.scss';

interface StatusFormProps {
  errorMessage: string
}

export const StatusForm = ({ errorMessage }: StatusFormProps) => {
  return (
	<div
		data-testid="error-wrap"
		className={styles.errorWrap}
	>
		<Spinner className={styles.spinner} />

		<span className={styles.error}>{errorMessage}</span>
	</div>
  );
};
