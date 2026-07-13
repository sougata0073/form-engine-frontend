import {CommonResponseQuestionResponse} from './common-response-question-response';

export interface ShortAnswerResponseQuestionRes {
  responses: ShortAnswerResponseQuestionResResponse[]
}

export interface ShortAnswerResponseQuestionResResponse extends CommonResponseQuestionResponse {
  text: string | null
}
