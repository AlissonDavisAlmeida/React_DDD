import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClientSpy } from '@/data/test/mock-http-client';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { randomUUID } from 'crypto';
import { mockAccountModel, mockAuthentication } from '@/domain/test/mock-account';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials.error';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { UnexpectedError } from '@/domain/errors/unexpected.error';
import { type AuthenticationParams } from '@/domain/usecases/authentication';
import { type AccountModel } from '@/domain/models/account.model';

interface SutTypes {
  sut: RemoteAuthentication
  httpPostClient: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClient = new HttpPostClientSpy<AuthenticationParams, AccountModel>();
  httpPostClient.response.body = {
    accessToken: randomUUID()
  };
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

  test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClient } = makeSut();
    httpPostClient.response = {
      statusCode: HttpStatusCode.unauthorized
    };

    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });
  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClient } = makeSut();
    httpPostClient.response = {
      statusCode: HttpStatusCode.badRequest
    };

    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClient } = makeSut();
    httpPostClient.response = {
      statusCode: HttpStatusCode.serverError
    };

    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClient } = makeSut();
    httpPostClient.response = {
      statusCode: HttpStatusCode.notFound
    };

    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return an AccountModel if HttpPostClient return 200', async () => {
    const { sut, httpPostClient } = makeSut();
    httpPostClient.response = {
      statusCode: HttpStatusCode.ok,
      body: mockAccountModel()

    };

    const account = await sut.auth(mockAuthentication());
    expect(account).toEqual(httpPostClient.response.body);
  });
});
