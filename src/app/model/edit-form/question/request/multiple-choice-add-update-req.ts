import {QuestionAddUpdateReq} from './question-add-update-req';

export interface OnlyMultipleChoiceAddUpdateReq {
  options: string[]
}

export interface MultipleChoiceAddUpdateReq extends QuestionAddUpdateReq, OnlyMultipleChoiceAddUpdateReq {
}

