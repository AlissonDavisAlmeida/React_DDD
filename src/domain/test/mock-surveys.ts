import { type SurveyModel } from "../models";

export const mockSurveyModel = (): SurveyModel[] => ([
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

]);
