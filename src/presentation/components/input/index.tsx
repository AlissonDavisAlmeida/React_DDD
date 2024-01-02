import React from 'react';
import { type DetailedHTMLProps, type InputHTMLAttributes } from 'react';
import styles from './input-styles.scss';

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = (props: InputProps) => {
  return (
	<div className={styles.inputWrap}>

		<input
			{...props}
		/>

		<span
			data-testid={`${props.name}-status`}
			title='Campo obrigatório'
			className={styles.status}
		>
			🟠
		</span>
	</div>
  );
};
