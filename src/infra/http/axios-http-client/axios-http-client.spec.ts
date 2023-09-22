import { AxiosHttpClient } from './axios-http-client';
import axios from 'axios';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { type HttpPostParams } from '@/data/protocols/http';

jest.mock('axios');

const mockResolvedValues = {
  status: faker.number.int({ min: 200, max: 299 }),
  data: faker.person.bio()
};

const mockedAxios = axios as jest.Mocked<typeof axios>;

mockedAxios.post.mockResolvedValue(mockResolvedValues);

interface MakeSut {
  sut: AxiosHttpClient
}

const makeSut = (): MakeSut => {
  const sut = new AxiosHttpClient();
  return {
    sut
  };
};

const mockPostRequest = (): HttpPostParams<any> => {
  return {
    url: faker.internet.url(),
    body: faker.person.bio
  };
};

describe('Axios Http Client', () => {
  test('should call axios with correct values', async () => {
    const { url, body } = mockPostRequest();
    const { sut } = makeSut();
    await sut.post({ url, body });

    expect(mockedAxios.post).toHaveBeenCalledWith(url, body);
  });
  test('should return the correct statusCode and body', async () => {
    const { url, body } = mockPostRequest();
    const { sut } = makeSut();
    const result = await sut.post({ url, body });

    expect(result).toEqual({
      statusCode: mockResolvedValues.status,
      body: mockResolvedValues.data
    });
  });
});
