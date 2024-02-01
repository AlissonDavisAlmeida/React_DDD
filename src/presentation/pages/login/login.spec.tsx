import React from 'react';
import { Login } from '.';
import { type RenderResult, render, cleanup, fireEvent } from '@testing-library/react';
import { ValidationSpy } from '@/presentation/test/mock-validation';
import { faker } from '@faker-js/faker/locale/pt_BR';

interface SutTypes {

  sut: RenderResult
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const errorMessage = faker.word.words();
  validationSpy.errorMessage = errorMessage;
  const sut = render(<Login validation={validationSpy} />);

  return {
    sut,
    validationSpy
  };
};

describe('Login Component', () => {
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
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe('🟠');
  });
  test('should show passwordError if validation fails', () => {
    const { sut, validationSpy } = makeSut();

    const emailInput = sut.getByTestId('password');
    fireEvent.input(emailInput, { target: { value: faker.internet.password() } });

    const emailStatus = sut.getByTestId('password-status');
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe('🟠');
  });

  test('should show valid email state if validation succeeds', () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.errorMessage = '';
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('Tudo certo!');
    expect(emailStatus.textContent).toBe('🟢');
  });
  test('should show valid password state if validation succeeds', () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.errorMessage = '';
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Tudo certo!');
    expect(passwordStatus.textContent).toBe('🟢');
  });

  test('should enable submit button if form is valid', () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.errorMessage = '';
    const emailInput = sut.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } });
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBeFalsy();
  });
});
