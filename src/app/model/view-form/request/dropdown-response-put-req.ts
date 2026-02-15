import {QuestionResponsePutReq} from './question-response-put-req';

export interface OnlyDropdownResponsePutReq {
  responseIndex: number
}

export interface DropdownResponsePutReq extends QuestionResponsePutReq, OnlyDropdownResponsePutReq {
}
