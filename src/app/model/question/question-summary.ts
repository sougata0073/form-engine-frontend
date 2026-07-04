import {QuestionType} from '../../type/question-type';

export interface QuestionSummary {
  id: string,
  question: string,
  questionType: QuestionType
}
