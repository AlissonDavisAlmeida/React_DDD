import React from 'react';
import { Login } from '.';
import { type RenderResult, render } from '@testing-library/react';

interface SutTypes {

  sut: RenderResult

}

const makeSut = (): SutTypes => {
  const sut = render(<Login />);

  return {
    sut
  };
};

describe('Login Component', () => {
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
});
