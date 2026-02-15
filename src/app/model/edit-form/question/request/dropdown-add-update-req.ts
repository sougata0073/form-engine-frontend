import {QuestionAddUpdateReq} from './question-add-update-req';

export interface OnlyDropdownAddUpdateReq {
  options: string[]
}

export interface DropdownAddUpdateReq extends QuestionAddUpdateReq, OnlyDropdownAddUpdateReq {
}

