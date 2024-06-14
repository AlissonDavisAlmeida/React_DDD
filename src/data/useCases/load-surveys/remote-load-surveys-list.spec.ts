import { HttpGetClientSpy } from "@/data/test";
import { RemoteLoadSurveysListUseCase } from "./remote-load-surveys-list";
import { type SurveyModel } from "@/domain/models";
import { UnexpectedError } from "@/domain/errors";
import { HttpStatusCode } from "@/data/protocols/http";

interface SutTypes {
  sut: RemoteLoadSurveysListUseCase
  httpGetClientSpy: HttpGetClientSpy<SurveyModel[]>
}

const makeSut = (): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<SurveyModel[]>();
  httpGetClientSpy.response.body = [
    {
      id: "any_id",
      question: "any_question",
      answers: [
        {
          image: "any_image",
          answer: "any_answer"
        }
      ],
      date: new Date(),
      didAnswer: true
    }

  ];

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

  it("should throw UnexpectedError if HttpGetClient returns 403", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    };

    const promise = sut.loadAll();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
