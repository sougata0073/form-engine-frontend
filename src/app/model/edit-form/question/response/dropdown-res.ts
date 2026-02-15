import {QuestionRes} from './question-res';

export interface OnlyDropdownRes {
  options: string[]
}

export interface DropdownRes extends OnlyDropdownRes, QuestionRes {
}

