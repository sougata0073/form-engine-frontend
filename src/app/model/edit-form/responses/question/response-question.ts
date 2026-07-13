import {QuestionType} from '../../../../type/question-type';

export interface ResponseQuestion {
  questionId: string,
  question: string | null,
  questionType: QuestionType,
  totalResponseCount: string
}
