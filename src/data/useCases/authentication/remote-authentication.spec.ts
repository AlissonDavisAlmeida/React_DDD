import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClientSpy } from '@/data/test/mock-http-client';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { mockAuthentication } from '@/domain/test/mock-authentication';

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

    await sut.auth(mockAuthentication());

    expect(httpPostClient.url).toBe(url);
  });

  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClient } = makeSut();
    const authenticationBody = mockAuthentication();
    await sut.auth(authenticationBody);

    expect(httpPostClient.body).toEqual(authenticationBody);
  });
});
