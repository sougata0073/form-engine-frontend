import {QuestionResponsePutReq} from './question-response-put-req';

export interface OnlyMultipleChoiceGridRowResponsePutReq {
  rowId: string,
  responseColumnId: string | null
}

export interface OnlyMultipleChoiceGridResponsePutReq {
  rows: OnlyMultipleChoiceGridRowResponsePutReq[]
}

export interface MultipleChoiceGridResponsePutReq extends QuestionResponsePutReq, OnlyMultipleChoiceGridResponsePutReq {

}
