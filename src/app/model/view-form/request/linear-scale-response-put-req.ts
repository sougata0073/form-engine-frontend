import {QuestionResponsePutReq} from './question-response-put-req';

export interface OnlyLinearScaleResponsePutReq {
  scale: number | null
}

export interface LinearScaleResponsePutReq extends QuestionResponsePutReq, OnlyLinearScaleResponsePutReq {

}
