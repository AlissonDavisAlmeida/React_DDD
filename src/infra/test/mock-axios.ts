import axios from 'axios';
import { faker } from '@faker-js/faker/locale/pt_BR';

export interface MockAxios {
  mockResolvedValues: {
    status: number
    data: any
  }
  mockedAxios: jest.Mocked<typeof axios>
}

export const mockAxios = (): MockAxios => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  const mockResolvedValues = {
    status: faker.number.int({ min: 200, max: 299 }),
    data: faker.person.bio()
  };

  mockedAxios.post.mockResolvedValue(mockResolvedValues);

  return { mockResolvedValues, mockedAxios };
};
