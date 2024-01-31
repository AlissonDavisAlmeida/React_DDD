import React from 'react';
import { Login } from '.';
import { type RenderResult, render, cleanup, fireEvent } from '@testing-library/react';
import { type Validation } from '@/presentation/protocols/validation';

interface SutTypes {

  sut: RenderResult
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  fieldName: string = '';
  fieldValue: string = '';
  errorMessage: string = '';
  validate (fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    return this.errorMessage;
  }
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

  test.each`
    fieldName    | errorMessage
    ${'email'}   | ${'Campo obrigatório'}
    ${'password'}| ${'Campo obrigatório'}
  `('should show $errorMessage if $fieldName is invalid', async ({ fieldName, errorMessage }) => {
    const { sut, validationSpy } = makeSut();

    const input = await sut.findByTestId(fieldName);
    fireEvent.input(input, { target: { value: 'any_value' } });

    expect(validationSpy.fieldName).toBe(fieldName);
    expect(validationSpy.fieldValue).toBe('any_value');
  });
});
