import {CommonResponseQuestionResponse} from './common-response-question-response';
import {ResponseQuestion} from './response-question';

export interface DateResponseQuestionRes extends ResponseQuestion<DateResponseQuestionResResponse> {
}

export interface DateResponseQuestionResResponse extends CommonResponseQuestionResponse {
  date: string
}
