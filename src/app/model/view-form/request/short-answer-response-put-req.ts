import {QuestionResponsePutReq} from './question-response-put-req';

export interface OnlyShortAnswerResponsePutReq {
  text: string | null
}

export interface ShortAnswerResponsePutReq extends QuestionResponsePutReq, OnlyShortAnswerResponsePutReq {

}
