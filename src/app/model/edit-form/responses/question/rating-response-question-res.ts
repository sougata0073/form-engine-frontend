import {CommonResponseQuestionResponse} from './common-response-question-response';
import {ResponseQuestion} from './response-question';
import {RatingIcon} from '../../../../type/rating-icon';

export interface RatingResponseQuestionRes extends ResponseQuestion<RatingResponseQuestionResResponse> {
  ratingIcon: RatingIcon,
  maxRatingNumber: number
}

export interface RatingResponseQuestionResResponse extends CommonResponseQuestionResponse {
  rating: number
}
