import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClientSpy } from '@data/test/mock-http-client';
import { faker } from '@faker-js/faker';

interface SutTypes {
  sut: RemoteAuthentication
  httpPostClient: HttpPostClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClient = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClient);

  return { sut, httpPostClient };
};

describe('RemoteAuthentication', () => {
  test('should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClient } = makeSut(url);

    await sut.auth();

    expect(httpPostClient.url).toBe(url);
  });
});
