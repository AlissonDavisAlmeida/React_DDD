import React, { useContext } from "react";
import { type DetailedHTMLProps, type InputHTMLAttributes } from "react";
import styles from "./input-styles.scss";

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface InputAttributes<ContextType> {
  props: InputProps
  context: React.Context<ContextType>
}

export const Input = <T,>({ context, props: { name, ...props } }: InputAttributes<T>) => {
  const { inputError, inputValue, setState } = useContext<T>(context) as any;

  const getStatus = (): string => {
    if (inputError && inputError[name as keyof typeof inputError]) {
      return "🟠";
    }

    return "🟢";
  };

  const getTitle = () => {
    return (!!inputError && inputError[name as keyof typeof inputError]) || "Tudo certo!";
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setState?.((old: any) => ({
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
			name={name}
			{...props}
			data-testid={name}
			value={inputValue?.[name as keyof typeof inputValue]}
			onChange={onChange}
			autoComplete="off"
		/>

		<span
			data-testid={`${name}-status`}
			title={getTitle()}
			className={styles.status}
		>
			{getStatus()}
		</span>
	</div>
  );
};
