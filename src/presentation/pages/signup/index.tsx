import React, { type FC, useState, useEffect, useContext } from "react";
import styles from "./signup-styles.scss";
import { LoginHeader, Footer, Input, StatusForm } from "@/presentation/components";
import { FormContextSignup, type FormContextSignupProps } from "@/presentation/context/signup/form/form-context-signup";
import { type Validation } from "@/presentation/protocols/validation";
import { Link, useNavigate } from "react-router-dom";
import { type AddAccount } from "@/domain/usecases";
import { ApiContext } from "@/presentation/context/api/api-context";

interface SignupProps {
  validation?: Validation
  addAccount?: AddAccount
}

export const Signup: FC<SignupProps> = ({ validation, addAccount }) => {
  const [state, setState] = useState<FormContextSignupProps>({
    isLoading: false,
    errorMessage: "",
    inputError: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: ""
    },
    inputValue: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: ""
    }
  });

  const navigate = useNavigate();
  const { setCurrentAccount } = useContext(ApiContext);

  useEffect(() => {
    if (state.inputValue) {
      setState((old) => ({
        ...old,
        inputError: {
          ...old.inputError,
          name: validation?.validate("name", { name: state.inputValue?.name as string }),
          email: validation?.validate("email", { email: state.inputValue?.email as string }),
          password: validation?.validate("password", { password: state.inputValue?.passwordConfirmation as string }),
          passwordConfirmation: validation?.validate("passwordConfirmation", { password: state.inputValue?.password as string, passwordConfirmation: state.inputValue?.passwordConfirmation as string })
        }
      }));
    }
  }, [
    state.inputValue?.name,
    state.inputValue?.email,
    state.inputValue?.password,
    state.inputValue?.passwordConfirmation]);

  const isInvalidForm = (): boolean => {
    return (
      !!state.inputError?.email ||
      !!state.inputError?.password ||
      !!state.inputError?.name ||
      !!state.inputError?.passwordConfirmation);
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
      const account = await addAccount?.add({
        name: state.inputValue?.name as string,
        email: state.inputValue?.email as string,
        password: state.inputValue?.password as string,
        passwordConfirmation: state.inputValue?.passwordConfirmation as string
      });

      if (account) {
        setCurrentAccount(account);
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
	<div className={styles.signup}>
		<LoginHeader />

		<FormContextSignup.Provider

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
				<h2>Signup</h2>

				<Input<FormContextSignupProps>
					context={FormContextSignup}
					props={{

					  type: "text",
					  name: "name",
					  placeholder: "Digite seu nome"
					}}
				/>

				<Input<FormContextSignupProps>
					context={FormContextSignup}
					props={{

					  type: "email",
					  name: "email",
					  placeholder: "Digite seu email"
					}}
				/>

				<Input<FormContextSignupProps>
					context={FormContextSignup}
					props={{

					  type: "password",
					  name: "password",
					  placeholder: "Digite sua senha"
					}}
				/>

				<Input<FormContextSignupProps>
					context={FormContextSignup}
					props={{

					  type: "password",
					  name: "passwordConfirmation",
					  placeholder: "Digite sua senha novamente"
					}}
				/>

				<button
					className={styles.submit}
					type="submit"
					data-testid="submit"
					disabled={isInvalidForm()}
				>
					Register
				</button>

				<Link
					data-testid="login"
					className={styles.link}
					to="/login"
				>
					Fazer login
				</Link>

				<StatusForm<FormContextSignupProps>
					context={FormContextSignup}
				/>
			</form>
		</FormContextSignup.Provider>

		<Footer />
	</div>
  );
};
