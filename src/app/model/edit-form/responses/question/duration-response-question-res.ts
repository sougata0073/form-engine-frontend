import {CommonResponseQuestionResponse} from './common-response-question-response';
import {ResponseQuestion} from './response-question';

export interface DurationResponseQuestionRes extends ResponseQuestion<DurationResponseQuestionResResponse> {
}

export interface DurationResponseQuestionResResponse extends CommonResponseQuestionResponse {
  hours: number,
  minutes: number,
  seconds: number
}
