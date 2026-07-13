import {QuestionType} from '../../../type/question-type';

export interface QuestionResponsePutReq {
  questionId: string,
  question: string | null,
  questionType: QuestionType
}
