import {QuestionResponsePutReq} from './question-response-put-req';

export interface OnlyMultipleChoiceResponsePutReq {
  responseOptionId: string | null
}

export interface MultipleChoiceResponsePutReq extends QuestionResponsePutReq, OnlyMultipleChoiceResponsePutReq {

}
