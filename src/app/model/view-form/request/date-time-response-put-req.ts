import {QuestionResponsePutReq} from './question-response-put-req';

export interface OnlyDateTimeResponsePutReq {
  dateTime: Date | null
}

export interface DateTimeResponsePutReq extends QuestionResponsePutReq, OnlyDateTimeResponsePutReq {
}
