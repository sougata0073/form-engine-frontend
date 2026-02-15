import {QuestionRes} from './question-res';

export interface OnlyMultipleChoiceRes {
  options: string[]
}

export interface MultipleChoiceRes extends OnlyMultipleChoiceRes, QuestionRes {
}

