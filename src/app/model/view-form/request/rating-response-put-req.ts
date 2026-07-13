import {QuestionResponsePutReq} from './question-response-put-req';

export interface OnlyRatingResponsePutReq {
  rating: number | null
}

export interface RatingResponsePutReq extends QuestionResponsePutReq, OnlyRatingResponsePutReq {

}
