import { AxiosHttpClient } from './axios-http-client';
import axios from 'axios';
import { faker } from '@faker-js/faker/locale/pt_BR';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

interface MakeSut {
  sut: AxiosHttpClient
}

const makeSut = (): MakeSut => {
  const sut = new AxiosHttpClient();
  return {
    sut
  };
};

describe('Axios Http Client', () => {
  test('should call axios with correct url and verb post', async () => {
    const url = faker.internet.url();
    const { sut } = makeSut();
    await sut.post({ url, body: {} });

    expect(mockedAxios.post).toHaveBeenCalledWith(url);
  });
});
