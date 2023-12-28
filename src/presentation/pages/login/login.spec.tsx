import React from 'react';
import { Login } from '.';
import { render } from '@testing-library/react';
describe('Login Component', () => {
  test('should not render spinner and error on start', async () => {
    const { findByTestId } = render(<Login />);

    const errorWrap = await findByTestId('error-wrap');

    expect(errorWrap.childElementCount).toBe(0);
  });
});
