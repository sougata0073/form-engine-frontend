import {CommonResponseQuestionResponse} from './common-response-question-response';
import {ResponseQuestion} from './response-question';

export interface LinearScaleResponseQuestionRes extends ResponseQuestion<LinearScaleResponseQuestionResResponse> {
  fromNumber: number,
  toNumber: number
}

export interface LinearScaleResponseQuestionResResponse extends CommonResponseQuestionResponse {
  scale: number
}
