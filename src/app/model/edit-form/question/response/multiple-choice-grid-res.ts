import {QuestionRes} from './question-res';

export interface OnlyMultipleChoiceGridRes {
  rows: string[],
  columns: string[]
}

export interface MultipleChoiceGridRes extends OnlyMultipleChoiceGridRes, QuestionRes {
}

