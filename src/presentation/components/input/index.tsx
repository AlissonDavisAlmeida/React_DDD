import React, { useContext } from 'react';
import { type DetailedHTMLProps, type InputHTMLAttributes } from 'react';
import styles from './input-styles.scss';
import { FormContext } from '@/presentation/context/form/form-context';

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = (props: InputProps) => {
  const { inputError, inputValue, setState } = useContext(FormContext);

  const getStatus = (): string => {
    if (inputError && inputError[props.name as keyof typeof inputError]) {
      return '🟠';
    }

    return '🟢';
  };

  const getTitle = () => {
    return (!!inputError && inputError[props.name as keyof typeof inputError]) || 'Tudo certo!';
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setState?.((old) => ({
      ...old,
      inputValue: {
        ...old.inputValue,
        [name]: value
      }
    }));
  };

  return (
	<div className={styles.inputWrap}>

		<input
			{...props}
			data-testid={props.name}
			value={inputValue?.[props.name as keyof typeof inputValue]}
			onChange={onChange}
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
