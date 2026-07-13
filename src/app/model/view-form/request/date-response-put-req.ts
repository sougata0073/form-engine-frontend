import {QuestionResponsePutReq} from './question-response-put-req';

export interface OnlyDateResponsePutReq {
  date: Date | null
}

export interface DateResponsePutReq extends QuestionResponsePutReq, OnlyDateResponsePutReq {
}
