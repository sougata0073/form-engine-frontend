import {QuestionAddUpdateReq} from './question-add-update-req';

export interface OnlyTickBoxGridAddUpdateReq {
  eachRowRequired: boolean,
  rows: string[],
  columns: string[]
}

export interface TickBoxGridAddUpdateReq extends QuestionAddUpdateReq, OnlyTickBoxGridAddUpdateReq {
}

