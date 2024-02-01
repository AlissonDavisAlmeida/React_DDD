import React, { type FC, type HtmlHTMLAttributes } from 'react';
import styles from './spinner-styles.scss';

type SpinnerProps = HtmlHTMLAttributes<HTMLElement>

export const Spinner: FC<SpinnerProps> = (props) => {
  return (
	<div
		{...props}
		className={[styles.spinner, props.className].join(' ')}
		data-testid="spinner"
	>
		<div />

		<div />

		<div />

		<div />
	</div>
  );
};
