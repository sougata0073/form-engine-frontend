import {CommonResponseQuestionResponse} from './common-response-question-response';

export interface RatingResponseQuestionRes {
  responses: RatingResponseQuestionResResponse[]
}

export interface RatingResponseQuestionResResponse extends CommonResponseQuestionResponse {
  rating: number | null
}
