import { AxiosHttpClient } from './axios-http-client';
import axios from 'axios';
import { faker } from '@faker-js/faker/locale/pt_BR';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Axios Http Client', () => {
  test('should call axios with correct url', async () => {
    const url = faker.internet.url();
    const sut = new AxiosHttpClient();
    await sut.post({ url, body: {} });

    expect(mockedAxios.post).toHaveBeenCalledWith(url);
  });
});
