import {QuestionAddUpdateReq} from './question-add-update-req';

export interface OnlyMultipleChoiceGridAddUpdateReq {
  eachRowRequired: boolean,
  rows: string[],
  columns: string[]
}

export interface MultipleChoiceGridAddUpdateReq extends QuestionAddUpdateReq, OnlyMultipleChoiceGridAddUpdateReq {
}

