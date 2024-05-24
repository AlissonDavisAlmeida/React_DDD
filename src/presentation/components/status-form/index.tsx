import React, { useContext } from "react";
import { Spinner } from "../spinner";
import styles from "./status-form-styles.scss";

interface ContextProps<ContextType> {
  context: React.Context<ContextType>
}

export const StatusForm = <T,>({ context }: ContextProps<T>) => {
  const { isLoading, errorMessage } = useContext<T>(context) as any;

  return (
	<div
		data-testid="error-wrap"
		className={styles.errorWrap}
	>
		{isLoading && <Spinner className={styles.spinner} />}

		{!!errorMessage && <span
			data-testid="main-error"
			className={styles.error}
		                   >
			{errorMessage}
		</span>}

	</div>
  );
};
