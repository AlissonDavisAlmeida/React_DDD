import { type Authentication, type AuthenticationParams } from '@/domain/usecases';
import { type Validation } from '../protocols/validation';
import { type AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';

export class ValidationSpy implements Validation {
  fieldName: string = '';
  fieldValue: string = '';
  errorMessage: string = '';
  validate (fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    return this.errorMessage;
  }
}

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: AuthenticationParams = {} as any;
  async auth (params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    return await Promise.resolve(this.account);
  };
}
