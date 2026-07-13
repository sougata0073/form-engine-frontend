import {QuestionResponsePutReq} from './question-response-put-req';

export interface OnlyTimeResponsePutReq {
  time: Date | null
}

export interface TimeResponsePutReq extends QuestionResponsePutReq, OnlyTimeResponsePutReq {

}
