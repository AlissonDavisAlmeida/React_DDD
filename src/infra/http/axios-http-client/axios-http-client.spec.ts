import { AxiosHttpClient } from './axios-http-client';
import axios from 'axios';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { type HttpPostParams } from '@/data/protocols/http';

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

const mockPostRequest = (): HttpPostParams<any> => {
  return {
    url: faker.internet.url(),
    body: faker.person.bio
  };
};

describe('Axios Http Client', () => {
  test('should call axios with correct url and verb post', async () => {
    const { url } = mockPostRequest();
    const { sut } = makeSut();
    await sut.post({ url });

    expect(mockedAxios.post).toHaveBeenCalledWith(url, undefined);
  });
  test('should call axios with correct body', async () => {
    const { url, body } = mockPostRequest();
    const { sut } = makeSut();
    await sut.post({ url, body });

    expect(mockedAxios.post).toHaveBeenCalledWith(url, body);
  });
});
