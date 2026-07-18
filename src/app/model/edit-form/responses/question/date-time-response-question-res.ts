import {CommonResponseQuestionResponse} from './common-response-question-response';
import {ResponseQuestion} from './response-question';

export interface DateTimeResponseQuestionRes extends ResponseQuestion<DateTimeResponseQuestionResResponse> {
}

export interface DateTimeResponseQuestionResResponse extends CommonResponseQuestionResponse {
  dateTime: string
}
