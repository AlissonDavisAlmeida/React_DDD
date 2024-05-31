import React from "react";
import { Signup } from ".";
import { type RenderResult, render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ValidationSpy } from "@/presentation/test/mock-validation";
import { faker } from "@faker-js/faker/locale/pt_BR";
import { Routes, Route, MemoryRouter, useLocation } from "react-router-dom";
import { RemoteAddAccountMock } from "@/presentation/test/mock-remote-add-account";
import { UnexpectedError } from "@/domain/errors";
import { SaveAccessTokenMock } from "@/presentation/test/mock-save-access-token";

interface SutTypes {

  sut: RenderResult
  validationSpy: ValidationSpy
  addAccountSpy: RemoteAddAccountMock
  saveAccessTokenMock: SaveAccessTokenMock
}

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid='location-display'>{location.pathname}</div>;
};

const nameFake = faker.person.firstName();
const emailFake = faker.internet.email();
const passwordFake = faker.internet.password();

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const addAccountSpy = new RemoteAddAccountMock();
  const saveAccessTokenMock = new SaveAccessTokenMock();
  const errorMessage = faker.word.words();
  validationSpy.errorMessage = errorMessage;

  const sut = render(<>
	<MemoryRouter
		initialEntries={["/signup", "/"]}
		initialIndex={0}
	>
		<Routes>
			<Route
				path='/'
				element={<div data-testid='home-page'>home</div>}
			/>

			<Route
				path='/login'
				element={<div data-testid='login-page'>login</div>}
			/>

			<Route
				path='/signup'

				element={<Signup
					validation={validationSpy}
					addAccount={addAccountSpy}
					saveAccessToken={saveAccessTokenMock}
				         />}
			/>
		</Routes>

		<LocationDisplay />
	</MemoryRouter>

  </>

  );

  return {
    sut,
    validationSpy,
    addAccountSpy,
    saveAccessTokenMock
  };
};

const fillFields = (sut: RenderResult, validationSpy: ValidationSpy): void => {
  validationSpy.errorMessage = "";
  const nameInput = sut.getByTestId("name");
  fireEvent.input(nameInput, { target: { value: nameFake } });

  const emailInput = sut.getByTestId("email");
  fireEvent.input(emailInput, { target: { value: emailFake } });

  const passwordInput = sut.getByTestId("password");
  fireEvent.input(passwordInput, { target: { value: passwordFake } });

  const passwordConfirmationInput = sut.getByTestId("passwordConfirmation");
  fireEvent.input(passwordConfirmationInput, { target: { value: passwordFake } });
};

const testStatusForField = (sut: RenderResult, fieldName: string, validationSpy: ValidationSpy): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`);
  expect(fieldStatus.title).toBe(validationSpy.errorMessage);
  expect(fieldStatus.textContent).toBe("🟠");
};

describe("Signup Component", () => {
  const user = userEvent.setup();

  afterEach(cleanup);

  test("should start with initial state", async () => {
    const { sut, validationSpy } = makeSut();

    const errorWrap = await sut.findByTestId("error-wrap");
    const submitButton = await sut.findByTestId("submit") as HTMLButtonElement;

    expect(errorWrap.childElementCount).toBe(0);
    expect(submitButton.disabled).toBeTruthy();

    testStatusForField(sut, "name", validationSpy);

    testStatusForField(sut, "email", validationSpy);

    testStatusForField(sut, "password", validationSpy);

    testStatusForField(sut, "passwordConfirmation", validationSpy);
  });

  test("should inputValue starts with empty string", async () => {
    const { sut } = makeSut();

    const nameInput = await sut.findByTestId("name") as HTMLInputElement;
    expect(nameInput.value).toBe("");

    const emailInput = await sut.findByTestId("email") as HTMLInputElement;
    expect(emailInput.value).toBe("");

    const passwordInput = await sut.findByTestId("password") as HTMLInputElement;
    expect(passwordInput.value).toBe("");
    const passwordConfirmationInput = await sut.findByTestId("passwordConfirmation") as HTMLInputElement;
    expect(passwordConfirmationInput.value).toBe("");
  });

  test("should show emailError if validation fails", () => {
    const { sut, validationSpy } = makeSut();

    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, { target: { value: emailFake } });

    testStatusForField(sut, "email", validationSpy);
  });
  test("should show passwordError if validation fails", () => {
    const { sut, validationSpy } = makeSut();

    const emailInput = sut.getByTestId("password");
    fireEvent.input(emailInput, { target: { value: passwordFake } });

    testStatusForField(sut, "password", validationSpy);
  });

  test("should show valid email state if validation succeeds", () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.errorMessage = "";
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, { target: { value: emailFake } });

    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe("Tudo certo!");
    expect(emailStatus.textContent).toBe("🟢");
  });
  test("should show valid password state if validation succeeds", () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.errorMessage = "";
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(passwordInput, { target: { value: passwordFake } });

    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.title).toBe("Tudo certo!");
    expect(passwordStatus.textContent).toBe("🟢");
  });

  test("should enable submit button if form is valid", () => {
    const { sut, validationSpy } = makeSut();
    fillFields(sut, validationSpy);
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  test("should show spinner on submit", async () => {
    const { sut, validationSpy } = makeSut();
    fillFields(sut, validationSpy);
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    fireEvent.click(submitButton);

    await waitFor(() => sut.getByTestId("spinner"));
    const spinner = sut.getByTestId("spinner");
    expect(spinner).toBeTruthy();
  });

  test("should call AddAccount with correct values", async () => {
    const { sut, addAccountSpy, validationSpy } = makeSut();
    fillFields(sut, validationSpy);
    const addSpy = jest.spyOn(addAccountSpy, "add");
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    await userEvent.click(submitButton);

    expect(addSpy).toHaveBeenCalledWith({
      name: nameFake,
      email: emailFake,
      password: passwordFake,
      passwordConfirmation: passwordFake
    });
  });

  test("should call AddAccount only once", async () => {
    const { sut, addAccountSpy, validationSpy } = makeSut();
    const addMethodSpy = jest.spyOn(addAccountSpy, "add");
    fillFields(sut, validationSpy);
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    await userEvent.click(submitButton);
    await userEvent.click(submitButton);

    expect(addMethodSpy).toHaveBeenCalledTimes(1);
  });

  test("should not call AddAccount if form is invalid", () => {
    const { sut, addAccountSpy } = makeSut();
    const addMethodSpy = jest.spyOn(addAccountSpy, "add");
    const form = sut.getByTestId("form") as HTMLButtonElement;
    fireEvent.submit(form);

    expect(addMethodSpy).toHaveBeenCalledTimes(0);
  });

  test("should present error if AddAccount fails", async () => {
    const { sut, addAccountSpy, validationSpy } = makeSut();
    const error = new UnexpectedError();
    jest.spyOn(addAccountSpy, "add").mockReturnValueOnce(Promise.reject(error));
    fillFields(sut, validationSpy);

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    fireEvent.click(submitButton);

    await waitFor(() => sut.getByTestId("error-wrap"));

    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(1);

    const mainError = sut.getByTestId("main-error");
    expect(mainError.textContent).toBe(error.message);
  });

  test("should go to login page", async () => {
    const { sut } = makeSut();

    const signup = sut.getByText(/Fazer login/i);
    await user.click(signup);

    expect(sut.getByTestId("login-page")).toBeTruthy();
    expect(sut.getByTestId("location-display").textContent).toBe("/login");
  });

  test("should present error if SaveAccessToken fails", async () => {
    const { sut, saveAccessTokenMock, validationSpy } = makeSut();
    fillFields(sut, validationSpy);
    const error = new Error(faker.lorem.sentence());
    jest.spyOn(saveAccessTokenMock, "save").mockRejectedValueOnce(error);

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    await user.click(submitButton);

    await waitFor(() => sut.getByTestId("error-wrap"));

    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(1);

    const mainError = sut.getByTestId("main-error");
    expect(mainError.textContent).toBe(error.message);
  });

  test("should call SaveAccessToken on success", async () => {
    const { sut, validationSpy, addAccountSpy, saveAccessTokenMock } = makeSut();
    fillFields(sut, validationSpy);

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    await user.click(submitButton);

    expect(saveAccessTokenMock.accessToken).toBe(addAccountSpy.accessToken);
    expect(sut.getByTestId("location-display").textContent).toBe("/");
  });
});
