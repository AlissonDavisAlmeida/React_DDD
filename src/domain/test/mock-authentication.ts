import { type AuthenticationParams } from '@/domain/usecases/authentication';
import { faker } from '@faker-js/faker/locale/pt_BR';

export const mockAuthentication = (): AuthenticationParams => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password()
  };
};
