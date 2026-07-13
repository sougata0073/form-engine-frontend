import {CommonResponseQuestionResponse} from './common-response-question-response';

export interface ParagraphResponseQuestionRes {
  responses: ParagraphResponseQuestionResResponse[]
}

export interface ParagraphResponseQuestionResResponse extends CommonResponseQuestionResponse {
  text: string | null
}
