import {QuestionRes} from './question-res';

export interface OnlyTickBoxGridRes {
  rows: string[],
  columns: string[]
}

export interface TickBoxGridRes extends OnlyTickBoxGridRes, QuestionRes {
}
