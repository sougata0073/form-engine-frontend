import {CommonResponseQuestionResponse} from './common-response-question-response';
import {ResponseQuestion} from './response-question';

export interface ParagraphResponseQuestionRes extends ResponseQuestion<ParagraphResponseQuestionResResponse> {
}

export interface ParagraphResponseQuestionResResponse extends CommonResponseQuestionResponse {
  text: string
}
