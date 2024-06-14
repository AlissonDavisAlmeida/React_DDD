import { HttpGetClientSpy } from "@/data/test";
import { RemoteLoadSurveysListUseCase } from "./remote-load-surveys-list";
import { type SurveyModel } from "@/domain/models";

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
});
