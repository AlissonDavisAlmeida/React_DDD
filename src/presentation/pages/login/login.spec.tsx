import React from "react";
import { Login } from ".";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthenticationSpy, ValidationSpy } from "@/presentation/test/mock-validation";
import { faker } from "@faker-js/faker/locale/pt_BR";
import { InvalidCredentialsError } from "@/domain/errors";
import { Routes, Route, MemoryRouter, useLocation } from "react-router-dom";
import { type AccountModel } from "@/domain/models";
import { ApiContext } from "@/presentation/context/api/api-context";

interface SutTypes {

  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
  saveCurrentAccountMock: (account: AccountModel) => void
}

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid='location-display'>{location.pathname}</div>;
};

const emailFake = faker.internet.email();
const passwordFake = faker.internet.password();

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();
  const saveCurrentAccountMock = jest.fn();
  const getCurrentAccountMock = jest.fn();
  const errorMessage = faker.word.words();
  validationSpy.errorMessage = errorMessage;

  render(<>
	<ApiContext.Provider value={{ setCurrentAccount: saveCurrentAccountMock, getCurrentAccount: getCurrentAccountMock }}>
		<MemoryRouter
			initialEntries={["/login", "/"]}
			initialIndex={0}
		>
			<Routes>
				<Route
					path='/'
					element={<div data-testid='home-page'>home</div>}
				/>

				<Route
					path='/login'
					element={<Login
						validation={validationSpy}
						authentication={authenticationSpy}
					         />}
				/>

				<Route
					path='/signup'
					element={<div data-testid='signup-page'>signup</div>}
				/>
			</Routes>

			<LocationDisplay />
		</MemoryRouter>
	</ApiContext.Provider>

  </>

  );

  return {
    validationSpy,
    authenticationSpy,
    saveCurrentAccountMock
  };
};

const fillFields = (validationSpy: ValidationSpy): void => {
  validationSpy.errorMessage = "";
  const emailInput = screen.getByTestId("email");
  fireEvent.input(emailInput, { target: { value: emailFake } });

  const passwordInput = screen.getByTestId("password");
  fireEvent.input(passwordInput, { target: { value: passwordFake } });
};

describe("Login Component", () => {
  const user = userEvent.setup();

  test("should start with initial state", async () => {
    const { validationSpy } = makeSut();

    const errorWrap = await screen.findByTestId("error-wrap");
    const submitButton = await screen.findByTestId("submit") as HTMLButtonElement;

    expect(errorWrap.childElementCount).toBe(0);
    expect(submitButton.disabled).toBeTruthy();

    const inputStatusLabelEmail = await screen.findByTestId("email-status");
    expect(inputStatusLabelEmail.title).toBe(validationSpy.errorMessage);
    expect(inputStatusLabelEmail.textContent).toBe("🟠");

    const inputStatusLabelPassword = await screen.findByTestId("password-status");
    expect(inputStatusLabelPassword.title).toBe(validationSpy.errorMessage);
    expect(inputStatusLabelPassword.textContent).toBe("🟠");
  });

  test("should inputValue starts with empty string", async () => {
    makeSut();
    const emailInput = await screen.findByTestId("email") as HTMLInputElement;
    expect(emailInput.value).toBe("");

    const passwordInput = await screen.findByTestId("password") as HTMLInputElement;
    expect(passwordInput.value).toBe("");
  });

  test("should show emailError if validation fails", () => {
    const { validationSpy } = makeSut();

    const emailInput = screen.getByTestId("email");
    fireEvent.input(emailInput, { target: { value: emailFake } });

    const emailStatus = screen.getByTestId("email-status");
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe("🟠");
  });
  test("should show passwordError if validation fails", () => {
    const { validationSpy } = makeSut();

    const emailInput = screen.getByTestId("password");
    fireEvent.input(emailInput, { target: { value: passwordFake } });

    const emailStatus = screen.getByTestId("password-status");
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe("🟠");
  });

  test("should show valid email state if validation succeeds", () => {
    const { validationSpy } = makeSut();
    validationSpy.errorMessage = "";
    const emailInput = screen.getByTestId("email");
    fireEvent.input(emailInput, { target: { value: emailFake } });

    const emailStatus = screen.getByTestId("email-status");
    expect(emailStatus.title).toBe("Tudo certo!");
    expect(emailStatus.textContent).toBe("🟢");
  });
  test("should show valid password state if validation succeeds", () => {
    const { validationSpy } = makeSut();
    validationSpy.errorMessage = "";
    const passwordInput = screen.getByTestId("password");
    fireEvent.input(passwordInput, { target: { value: passwordFake } });

    const passwordStatus = screen.getByTestId("password-status");
    expect(passwordStatus.title).toBe("Tudo certo!");
    expect(passwordStatus.textContent).toBe("🟢");
  });

  test("should enable submit button if form is valid", () => {
    const { validationSpy } = makeSut();
    fillFields(validationSpy);
    const submitButton = screen.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  test("should show spinner on submit", async () => {
    const { validationSpy } = makeSut();
    fillFields(validationSpy);
    const submitButton = screen.getByTestId("submit") as HTMLButtonElement;
    fireEvent.click(submitButton);

    await waitFor(() => screen.getByTestId("spinner"));
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeTruthy();
  });

  test("should call Authentication with correct values", async () => {
    const { authenticationSpy, validationSpy } = makeSut();
    fillFields(validationSpy);
    const submitButton = screen.getByTestId("submit") as HTMLButtonElement;
    await userEvent.click(submitButton);

    expect(authenticationSpy.params).toStrictEqual({
      email: emailFake,
      password: passwordFake

    });
  });

  test("should call Authentication only once", async () => {
    const { authenticationSpy, validationSpy } = makeSut();
    const authMethodSPy = jest.spyOn(authenticationSpy, "auth");
    fillFields(validationSpy);
    const submitButton = screen.getByTestId("submit") as HTMLButtonElement;
    await userEvent.click(submitButton);
    await userEvent.click(submitButton);

    expect(authMethodSPy).toHaveBeenCalledTimes(1);
  });

  test("should not call Authentication if form is invalid", () => {
    const { authenticationSpy } = makeSut();
    const authMethodSPy = jest.spyOn(authenticationSpy, "auth");
    const form = screen.getByTestId("form") as HTMLButtonElement;
    fireEvent.submit(form);

    expect(authMethodSPy).toHaveBeenCalledTimes(0);
  });

  test("should present error if Authentication fails", async () => {
    const { authenticationSpy, validationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest.spyOn(authenticationSpy, "auth").mockReturnValueOnce(Promise.reject(error));
    fillFields(validationSpy);
    const submitButton = screen.getByTestId("submit") as HTMLButtonElement;
    fireEvent.click(submitButton);

    await waitFor(() => screen.getByTestId("error-wrap"));

    const errorWrap = screen.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(1);

    const mainError = screen.getByTestId("main-error");
    expect(mainError.textContent).toBe(error.message);
  });

  test("should call SaveAccessToken on success", async () => {
    const { validationSpy, authenticationSpy, saveCurrentAccountMock } = makeSut();
    fillFields(validationSpy);

    const submitButton = screen.getByTestId("submit") as HTMLButtonElement;
    await user.click(submitButton);

    expect(saveCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account);
    expect(screen.getByTestId("location-display").textContent).toBe("/");
  });

  test("should go to signup page", async () => {
    makeSut();
    const signup = await screen.findByText(/Criar conta/i);
    await user.click(signup);

    expect(screen.getByTestId("signup-page")).toBeTruthy();
    expect(screen.getByTestId("location-display").textContent).toBe("/signup");
  });
});
