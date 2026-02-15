import {QuestionResponsePutReq} from './question-response-put-req';

export interface OnlyTickBoxGridResponsePutReq {
  rows: number[][]
}

export interface TickBoxGridResponsePutReq extends QuestionResponsePutReq, OnlyTickBoxGridResponsePutReq {

}
