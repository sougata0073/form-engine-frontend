import {QuestionResponsePutReq} from './question-response-put-req';

export interface OnlyDurationResponsePutReq {
  hours: number | null,
  minutes: number | null,
  seconds: number | null
}

export interface DurationResponsePutReq extends QuestionResponsePutReq, OnlyDurationResponsePutReq {
}
