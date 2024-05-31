import React, { type FC, useState, useEffect } from "react";
import styles from "./login-styles.scss";
import { LoginHeader, Footer, Input, StatusForm } from "@/presentation/components";
import { FormContextLogin, type FormContextLoginProps } from "@/presentation/context/login/form/form-context-login";
import { type Validation } from "@/presentation/protocols/validation";
import { type Authentication, type SaveAccessToken } from "@/domain/usecases";
import { Link, useNavigate } from "react-router-dom";

interface LoginProps {
  validation?: Validation
  authentication?: Authentication
  saveAccessToken?: SaveAccessToken
}

export const Login: FC<LoginProps> = ({ validation, authentication, saveAccessToken }) => {
  const [state, setState] = useState<FormContextLoginProps>({
    isLoading: false,
    errorMessage: "",
    inputError: {
      email: "",
      password: ""
    },
    inputValue: {
      email: "",
      password: ""
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (state.inputValue) {
      setState((old) => ({
        ...old,
        inputError: {
          ...old.inputError,
          email: validation?.validate("email", { email: state.inputValue?.email as string }),
          password: validation?.validate("password", { password: state.inputValue?.password as string })
        }
      }));
    }
  }, [state.inputValue?.email, state.inputValue?.password]);

  const isInvalidForm = (): boolean => {
    return (!!state.inputError?.email || !!state.inputError?.password);
  };

  const changeStateLoading = (value: boolean) => {
    setState((old) => ({
      ...old,
      isLoading: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (isInvalidForm() || state.isLoading) {
      return;
    }

    changeStateLoading(true);

    try {
      const account = await authentication?.auth({
        email: state.inputValue?.email as string,
        password: state.inputValue?.password as string
      });

      if (account) {
        await saveAccessToken?.save(account.accessToken);
      }

      navigate("/", {
        replace: true

      });
    } catch (error: any) {
      setState((old) => ({
        ...old,
        errorMessage: error.message
      }));
    }

    changeStateLoading(false);
  };

  return (
	<div className={styles.login}>
		<LoginHeader />

		<FormContextLogin.Provider

			value={{
	  ...state,
	  setState
			}}
		>
			<form
				className={styles.form}
				onSubmit={handleSubmit}
				data-testid="form"
			>
				<h2>Login</h2>

				<Input<FormContextLoginProps>
					context={FormContextLogin}
					props={{
					  type: "email",
					  name: "email",
					  placeholder: "Digite seu email"
					}}
				/>

				<Input<FormContextLoginProps>
					context={FormContextLogin}
					props={{
					  type: "password",
					  name: "password",
					  placeholder: "Digite sua senha"
					}}
				/>

				<button
					className={styles.submit}
					type="submit"
					data-testid="submit"
					disabled={isInvalidForm()}
				>
					Entrar
				</button>

				<Link
					data-testid="signup"
					className={styles.link}
					to="/signup"
				>
					Criar conta
				</Link>

				<StatusForm<FormContextLoginProps>
					context={FormContextLogin}
				/>
			</form>
		</FormContextLogin.Provider>

		<Footer />
	</div>
  );
};
