import {QuestionResponsePutReq} from './question-response-put-req';

export interface OnlyCheckboxResponsePutReq {
  responseIndexes: number[]
}

export interface CheckboxResponsePutReq extends QuestionResponsePutReq, OnlyCheckboxResponsePutReq {
}
