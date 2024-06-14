import { HttpStatusCode, MapHttpStatusToDomainError, type HttpGetClient } from "@/data/protocols/http";
import { type SurveyModel } from "@/domain/models";
import { type ILoadSurveysList } from "@/domain/usecases/survey/load-surveys-list.interface";

export class RemoteLoadSurveysListUseCase implements ILoadSurveysList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<SurveyModel[]>
  ) {}

  async loadAll (): Promise<SurveyModel[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });

    const error = MapHttpStatusToDomainError.get(httpResponse.statusCode);

    if (error) {
      error();
    }

    if (httpResponse.statusCode === HttpStatusCode.noContent) {
      return [];
    }

    return httpResponse.body as SurveyModel[];
  }
}
