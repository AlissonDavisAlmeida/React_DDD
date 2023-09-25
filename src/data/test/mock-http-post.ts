import { type HttpPostParams } from '../protocols/http';
import { faker } from '@faker-js/faker/locale/pt_BR';

export const mockPostRequest = (): HttpPostParams<any> => {
  return {
    url: faker.internet.url(),
    body: faker.person.bio
  };
};
