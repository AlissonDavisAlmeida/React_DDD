import { HttpStatusCode } from "@/data/protocols/http";
import { HttpPostClientSpy } from "@/data/test";
import { UnexpectedError } from "@/domain/errors";
import { type AccountModel } from "@/domain/models";
import { mockAccountModel } from "@/domain/test";
import { type AddAccountParams, type AuthenticationParams } from "@/domain/usecases";
import { faker } from "@faker-js/faker/locale/pt_BR";
import { randomUUID } from "crypto";
import { RemoteAddAccountUseCase } from "./remote-add-account";
import { EmailInUseError } from "@/domain/errors/email-in-use.error";

interface SutTypes {
  sut: RemoteAddAccountUseCase
  httpPostClient: HttpPostClientSpy<AuthenticationParams, AccountModel>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClient = new HttpPostClientSpy<AuthenticationParams, AccountModel>();
  httpPostClient.response.body = {
    token: randomUUID(),
    name: faker.person.firstName()
  };
  const sut = new RemoteAddAccountUseCase(url, httpPostClient);

  return { sut, httpPostClient };
};

const makeAddAccountParams = (): AddAccountParams => {
  const password = faker.internet.password();
  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  };
};

describe("RemoteAddAccountUseCase", () => {
  test("should call HttpPostClient with correct URL", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClient } = makeSut(url);

    await sut.add(makeAddAccountParams());

    expect(httpPostClient.url).toBe(url);
  });

  test("Should call HttpPostClient with correct body", async () => {
    const { sut, httpPostClient } = makeSut();
    const addAccountParams = makeAddAccountParams();
    await sut.add(addAccountParams);

    expect(httpPostClient.body).toEqual(addAccountParams);
  });

  test("Should throw UnexpectedError if HttpPostClient returns 403", async () => {
    const { sut, httpPostClient } = makeSut();
    httpPostClient.response = {
      statusCode: HttpStatusCode.emailInUse
    };

    const promise = sut.add(makeAddAccountParams());

    await expect(promise).rejects.toThrow(new EmailInUseError());
  });

  test("Should throw UnexpectedError if HttpPostClient returns 400", async () => {
    const { sut, httpPostClient } = makeSut();
    httpPostClient.response = {
      statusCode: HttpStatusCode.badRequest
    };

    const promise = sut.add(makeAddAccountParams());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  test("Should throw UnexpectedError if HttpPostClient returns 500", async () => {
    const { sut, httpPostClient } = makeSut();
    httpPostClient.response = {
      statusCode: HttpStatusCode.serverError
    };

    const promise = sut.add(makeAddAccountParams());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  test("Should throw UnexpectedError if HttpPostClient returns 404", async () => {
    const { sut, httpPostClient } = makeSut();
    httpPostClient.response = {
      statusCode: HttpStatusCode.notFound
    };

    const promise = sut.add(makeAddAccountParams());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test("Should return an AccountModel if HttpPostClient return 200", async () => {
    const { sut, httpPostClient } = makeSut();
    httpPostClient.response = {
      statusCode: HttpStatusCode.ok,
      body: mockAccountModel()

    };

    const account = await sut.add(makeAddAccountParams());
    expect(account).toEqual(httpPostClient.response.body);
  });

  test("Should throw UnexpectedError if HttpPostClient doesn't have body", async () => {
    const { sut, httpPostClient } = makeSut();
    httpPostClient.response = {
      statusCode: HttpStatusCode.ok,
      body: undefined
    };

    const promise = sut.add(makeAddAccountParams());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
