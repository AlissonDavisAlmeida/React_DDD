import { HttpGetClientSpy } from "@/data/test";
import { RemoteLoadSurveysListUseCase } from "./remote-load-surveys-list";
import { type SurveyModel } from "@/domain/models";
import { UnexpectedError } from "@/domain/errors";
import { HttpStatusCode } from "@/data/protocols/http";
import { mockSurveyModel } from "@/domain/test";

interface SutTypes {
  sut: RemoteLoadSurveysListUseCase
  httpGetClientSpy: HttpGetClientSpy<SurveyModel[]>
}

const makeSut = (): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<SurveyModel[]>();
  httpGetClientSpy.response.body = mockSurveyModel();

  const sut = new RemoteLoadSurveysListUseCase("any_url", httpGetClientSpy);
  return {
    sut,
    httpGetClientSpy
  };
};

describe("RemoteLoadSurveysList", () => {
  it("should call HttpGetClient with correct values", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    await sut.loadAll();

    expect(httpGetClientSpy.url).toBe("any_url");
  });

  it("should throw UnexpectedError if HttpGetClient returns 400", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    };

    const promise = sut.loadAll();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it("should throw UnexpectedError if HttpGetClient returns 404", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    };

    const promise = sut.loadAll();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  it("should throw ServerError if HttpGetClient returns 500", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    };

    const promise = sut.loadAll();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it("should return a list of SurveyModels if HttpGetClient returns 200", async () => {
    const { sut, httpGetClientSpy } = makeSut();

    const surveys = await sut.loadAll();

    expect(surveys).toEqual(httpGetClientSpy.response.body);
  });

  it("should return an empty list if HttpGetClient returns 204", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.noContent
    };

    const surveys = await sut.loadAll();

    expect(surveys).toEqual([]);
  });
});
