import {CommonResponseQuestionResponse} from './common-response-question-response';
import {ResponseQuestion} from './response-question';

export interface TimeResponseQuestionRes extends ResponseQuestion<TimeResponseQuestionResResponse> {
}

export interface TimeResponseQuestionResResponse extends CommonResponseQuestionResponse {
  time: string
}
