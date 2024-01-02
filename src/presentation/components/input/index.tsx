import React, { useContext } from 'react';
import { type DetailedHTMLProps, type InputHTMLAttributes } from 'react';
import styles from './input-styles.scss';
import { FormContext } from '@/presentation/context/form/form-context';

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = (props: InputProps) => {
  const { inputError } = useContext(FormContext);

  const getStatus = (): string => {
    return '🟠';
  };

  const getTitle = () => {
    return (!!inputError && inputError[props.name as keyof typeof inputError]) || 'Campo obrigatório';
  };

  return (
	<div className={styles.inputWrap}>

		<input
			{...props}
		/>

		<span
			data-testid={`${props.name}-status`}
			title={getTitle()}
			className={styles.status}
		>
			{getStatus()}
		</span>
	</div>
  );
};
