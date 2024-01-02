import React from 'react';
import { Login } from '.';
import { render, screen } from '@testing-library/react';
describe('Login Component', () => {
  test('should start with initial state', async () => {
    const { findByTestId } = render(<Login />);

    const errorWrap = await findByTestId('error-wrap');
    const submitButton = await screen.findByTestId('submit') as HTMLButtonElement;

    expect(errorWrap.childElementCount).toBe(0);
    expect(submitButton.disabled).toBeTruthy();

    const inputStatusLabelEmail = await screen.findByTestId('email-status');
    expect(inputStatusLabelEmail.title).toBe('Campo obrigatório');
    expect(inputStatusLabelEmail.textContent).toBe('🟠');

    const inputStatusLabelPassword = await screen.findByTestId('password-status');
    expect(inputStatusLabelPassword.title).toBe('Campo obrigatório');
    expect(inputStatusLabelPassword.textContent).toBe('🟠');
  });
});
