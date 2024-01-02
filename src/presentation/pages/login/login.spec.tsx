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
  });
});
