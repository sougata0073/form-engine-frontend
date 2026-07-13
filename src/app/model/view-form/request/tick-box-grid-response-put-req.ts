import {QuestionResponsePutReq} from './question-response-put-req';

export interface OnlyTickBoxGridRowResponsePutReq {
  rowId: string,
  responseColumnIds: string[]
}

export interface OnlyTickBoxGridResponsePutReq {
  rows: OnlyTickBoxGridRowResponsePutReq[]
}

export interface TickBoxGridResponsePutReq extends QuestionResponsePutReq, OnlyTickBoxGridResponsePutReq {

}
