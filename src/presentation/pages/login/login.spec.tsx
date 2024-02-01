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

  const sut = render(<Login validation={validationSpy} />);

  return {
    sut,
    validationSpy
  };
};

describe('Login Component', () => {
  afterEach(cleanup);

  test('should start with initial state', async () => {
    const { sut } = makeSut();

    const errorWrap = await sut.findByTestId('error-wrap');
    const submitButton = await sut.findByTestId('submit') as HTMLButtonElement;

    expect(errorWrap.childElementCount).toBe(0);
    expect(submitButton.disabled).toBeTruthy();

    const inputStatusLabelEmail = await sut.findByTestId('email-status');
    expect(inputStatusLabelEmail.title).toBe('Campo obrigatório');
    expect(inputStatusLabelEmail.textContent).toBe('🟠');

    const inputStatusLabelPassword = await sut.findByTestId('password-status');
    expect(inputStatusLabelPassword.title).toBe('Campo obrigatório');
    expect(inputStatusLabelPassword.textContent).toBe('🟠');
  });

  test('should inputValue starts with empty string', async () => {
    const { sut } = makeSut();

    const emailInput = await sut.findByTestId('email') as HTMLInputElement;
    expect(emailInput.value).toBe('');

    const passwordInput = await sut.findByTestId('password') as HTMLInputElement;
    expect(passwordInput.value).toBe('');
  });
  test('should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut();

    const emailInput = await sut.findByTestId('email');
    const emailFake = faker.internet.email();
    fireEvent.input(emailInput, { target: { value: emailFake } });
    expect(validationSpy.fieldName).toBe('email');
    expect(validationSpy.fieldValue).toBe(emailFake);

    const passwordInput = await sut.findByTestId('password');
    const passwordFake = faker.internet.password();
    fireEvent.input(passwordInput, { target: { value: passwordFake } });
    expect(validationSpy.fieldName).toBe('password');
    expect(validationSpy.fieldValue).toBe(passwordFake);
  });
});
