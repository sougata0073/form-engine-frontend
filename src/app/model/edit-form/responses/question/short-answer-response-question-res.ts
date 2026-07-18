import {CommonResponseQuestionResponse} from './common-response-question-response';
import {ResponseQuestion} from './response-question';

export interface ShortAnswerResponseQuestionRes extends ResponseQuestion<ShortAnswerResponseQuestionResResponse> {
}

export interface ShortAnswerResponseQuestionResResponse extends CommonResponseQuestionResponse {
  text: string
}
