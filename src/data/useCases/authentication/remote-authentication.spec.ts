import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClientSpy } from '@data/test/mock-http-client';

interface SutTypes {
  sut: RemoteAuthentication
  httpPostClient: HttpPostClientSpy
}

const makeSut = (url: string = 'any_url'): SutTypes => {
  const httpPostClient = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClient);

  return { sut, httpPostClient };
};

describe('RemoteAuthentication', () => {
  test('should call HttpPostClient with correct URL', async () => {
    const url = 'any_url';
    const { sut, httpPostClient } = makeSut(url);

    await sut.auth();

    expect(httpPostClient.url).toBe(url);
  });
});
