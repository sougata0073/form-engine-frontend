import {QuestionResponsePutReq} from './question-response-put-req';

export interface OnlyMultipleChoiceGridResponsePutReq {
  rows: (number | null)[]
}

export interface MultipleChoiceGridResponsePutReq extends QuestionResponsePutReq, OnlyMultipleChoiceGridResponsePutReq {

}
