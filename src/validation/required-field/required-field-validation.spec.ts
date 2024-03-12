import { RequireFieldError } from '../errors/required-field.error';
import { RequireFieldValidation } from './required-field-validation';

describe('RequireFieldValidation', () => {
  test('should return error if field is empty', () => {
    const sut = new RequireFieldValidation('email');
    const error = sut.validate('');

    expect(error).toEqual(new RequireFieldError('email'));
  });
});
