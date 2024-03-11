import React from 'react';
import { Login } from '.';
import { type RenderResult, render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthenticationSpy, ValidationSpy } from '@/presentation/test/mock-validation';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { InvalidCredentialsError } from '@/domain/errors';
import 'jest-localstorage-mock';
import { Routes, Route, MemoryRouter, useLocation } from 'react-router-dom';

interface SutTypes {

  sut: RenderResult
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
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
  const errorMessage = faker.word.words();
  validationSpy.errorMessage = errorMessage;

  const sut = render(<>
	<MemoryRouter initialEntries={['/login']}>
		<Routes>
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

		<LocationDisplay/>
	</MemoryRouter>

        </>

  );

  return {
    sut,
    validationSpy,
    authenticationSpy
  };
};

const fillFields = (sut: RenderResult, validationSpy: ValidationSpy): void => {
  validationSpy.errorMessage = '';
  const emailInput = sut.getByTestId('email');
  fireEvent.input(emailInput, { target: { value: emailFake } });

  const passwordInput = sut.getByTestId('password');
  fireEvent.input(passwordInput, { target: { value: passwordFake } });
};

describe('Login Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(cleanup);

  test('should start with initial state', async () => {
    const { sut, validationSpy } = makeSut();

    const errorWrap = await sut.findByTestId('error-wrap');
    const submitButton = await sut.findByTestId('submit') as HTMLButtonElement;

    expect(errorWrap.childElementCount).toBe(0);
    expect(submitButton.disabled).toBeTruthy();

    const inputStatusLabelEmail = await sut.findByTestId('email-status');
    expect(inputStatusLabelEmail.title).toBe(validationSpy.errorMessage);
    expect(inputStatusLabelEmail.textContent).toBe('🟠');

    const inputStatusLabelPassword = await sut.findByTestId('password-status');
    expect(inputStatusLabelPassword.title).toBe(validationSpy.errorMessage);
    expect(inputStatusLabelPassword.textContent).toBe('🟠');
  });

  test('should inputValue starts with empty string', async () => {
    const { sut } = makeSut();

    const emailInput = await sut.findByTestId('email') as HTMLInputElement;
    expect(emailInput.value).toBe('');

    const passwordInput = await sut.findByTestId('password') as HTMLInputElement;
    expect(passwordInput.value).toBe('');
  });

  test('should show emailError if validation fails', () => {
    const { sut, validationSpy } = makeSut();

    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: emailFake } });

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe('🟠');
  });
  test('should show passwordError if validation fails', () => {
    const { sut, validationSpy } = makeSut();

    const emailInput = sut.getByTestId('password');
    fireEvent.input(emailInput, { target: { value: passwordFake } });

    const emailStatus = sut.getByTestId('password-status');
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe('🟠');
  });

  test('should show valid email state if validation succeeds', () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.errorMessage = '';
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: emailFake } });

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('Tudo certo!');
    expect(emailStatus.textContent).toBe('🟢');
  });
  test('should show valid password state if validation succeeds', () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.errorMessage = '';
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: passwordFake } });

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Tudo certo!');
    expect(passwordStatus.textContent).toBe('🟢');
  });

  test('should enable submit button if form is valid', () => {
    const { sut, validationSpy } = makeSut();
    fillFields(sut, validationSpy);
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  test('should show spinner on submit', () => {
    const { sut, validationSpy } = makeSut();
    fillFields(sut, validationSpy);
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    fireEvent.click(submitButton);
    const spinner = sut.getByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  test('should call Authentication with correct values', () => {
    const { sut, authenticationSpy, validationSpy } = makeSut();
    fillFields(sut, validationSpy);
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    fireEvent.click(submitButton);

    expect(authenticationSpy.params).toStrictEqual({
      email: emailFake,
      password: passwordFake

    });
  });

  test('should call Authentication only once', () => {
    const { sut, authenticationSpy, validationSpy } = makeSut();
    const authMethodSPy = jest.spyOn(authenticationSpy, 'auth');
    fillFields(sut, validationSpy);
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    fireEvent.click(submitButton);
    fireEvent.click(submitButton);

    expect(authMethodSPy).toHaveBeenCalledTimes(1);
  });

  test('should not call Authentication if form is invalid', () => {
    const { sut, authenticationSpy } = makeSut();
    const authMethodSPy = jest.spyOn(authenticationSpy, 'auth');
    const form = sut.getByTestId('form') as HTMLButtonElement;
    fireEvent.submit(form);

    expect(authMethodSPy).toHaveBeenCalledTimes(0);
  });

  test('should present error if Authentication fails', async () => {
    const { sut, authenticationSpy, validationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error));
    fillFields(sut, validationSpy);
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    fireEvent.click(submitButton);

    await waitFor(() => sut.getByTestId('error-wrap'));

    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(1);

    const mainError = sut.getByTestId('main-error');
    expect(mainError.textContent).toBe(error.message);
  });

  test('should add accessToken to localstorage on success', async () => {
    const { sut, validationSpy, authenticationSpy } = makeSut();
    fillFields(sut, validationSpy);

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    fireEvent.click(submitButton);

    await waitFor(() => sut.getByTestId('error-wrap'));

    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken);
  });

  test('should go to signup page', async () => {
    const { sut } = makeSut();
    const user = userEvent.setup();
    const signup = sut.getByText(/Criar conta/i);
    await user.click(signup);
    // expect(router.state.location.pathname).toBe('/signup');
    expect(sut.getByTestId('signup-page')).toBeTruthy();
    expect(sut.getByTestId('location-display').textContent).toBe('/signup');
  });
});
