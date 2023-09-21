import { type AuthenticationParams } from '@/domain/usecases/authentication';
import { type AccountModel } from '../models/account.model';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker/locale/pt_BR';

export const mockAuthentication = (): AuthenticationParams => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  };
};

export const mockAccountModel = (): AccountModel => {
  return {
    accessToken: randomUUID()
  };
};
