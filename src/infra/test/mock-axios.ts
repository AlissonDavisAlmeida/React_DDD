import axios from "axios";
import { faker } from "@faker-js/faker/locale/pt_BR";

export interface MockAxios {
  mockResolvedPostValues: {
    status: number
    data: any
  }
  mockResolvedGetValues: {
    status: number
    data: any

  }
  mockedAxios: jest.Mocked<typeof axios>
}

export const mockAxios = (): MockAxios => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  const mockResolvedPostValues = {
    status: faker.number.int({ min: 200, max: 299 }),
    data: faker.person.bio()
  };

  const mockResolvedGetValues = {
    status: faker.number.int({ min: 200, max: 299 }),
    data: faker.definitions.airline.airline
  };

  mockedAxios.post.mockClear().mockResolvedValue(mockResolvedPostValues);
  mockedAxios.get.mockClear().mockResolvedValue(mockResolvedGetValues);

  return { mockResolvedPostValues, mockResolvedGetValues, mockedAxios };
};
