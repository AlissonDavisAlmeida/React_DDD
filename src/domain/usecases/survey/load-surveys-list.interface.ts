import { type SurveyModel } from "@/domain/models";

export interface ILoadSurveysList {
  loadAll: () => Promise<SurveyModel[]>
}
