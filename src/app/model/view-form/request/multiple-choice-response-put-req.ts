import {QuestionResponsePutReq} from './question-response-put-req';

export interface OnlyMultipleChoiceResponsePutReq {
  responseIndex: number
}

export interface MultipleChoiceResponsePutReq extends QuestionResponsePutReq, OnlyMultipleChoiceResponsePutReq {

}
