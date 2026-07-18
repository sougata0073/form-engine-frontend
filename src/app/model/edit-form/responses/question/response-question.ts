import {QuestionType} from '../../../../type/question-type';

export interface ResponseQuestion<TResponses> {
  questionId: string,
  question: string | null,
  questionType: QuestionType,
  totalResponseCount: string,
  responses: TResponses[]
}
