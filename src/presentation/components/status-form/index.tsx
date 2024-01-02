import React, { useContext } from 'react';
import { Spinner } from '../spinner';
import styles from './status-form-styles.scss';
import { FormContext } from '@/presentation/context/form/form-context';

export const StatusForm = () => {
  const { isLoading, errorMessage } = useContext(FormContext);

  return (
	<div
		data-testid="error-wrap"
		className={styles.errorWrap}
	>
		{isLoading && <Spinner className={styles.spinner} />}

		{!!errorMessage && <span className={styles.error}>{errorMessage}</span>}

	</div>
  );
};
