import {QuestionResponsePutReq} from './question-response-put-req';

export interface OnlyParagraphResponsePutReq {
  text: string | null
}

export interface ParagraphResponsePutReq extends QuestionResponsePutReq, OnlyParagraphResponsePutReq {

}
