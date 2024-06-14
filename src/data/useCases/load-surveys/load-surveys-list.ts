import { type SurveyModel } from "@/domain/models";
import { type ILoadSurveysList } from "@/domain/usecases/survey/load-surveys-list.interface";

export class LoadSurveysListUseCase implements ILoadSurveysList {
  constructor (private readonly loadSurveysListRepository: ILoadSurveysListRepository) {}

  async loadAll (): Promise<SurveyModel[]> {
    return this.loadSurveysListRepository.loadAll();
  }
}
