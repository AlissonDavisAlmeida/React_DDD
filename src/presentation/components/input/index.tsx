import { type DetailedHTMLProps, type InputHTMLAttributes } from 'react';
import styles from './input-styles.scss';

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = (props: InputProps) => {
  return (
	<div className={styles.inputWrap}>

		<input
			{...props}
		/>

		<span className={styles.status}>🟠</span>
	</div>
  );
};
