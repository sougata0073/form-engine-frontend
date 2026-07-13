import {CommonResponseQuestionResponse} from './common-response-question-response';

export interface DateTimeResponseQuestionRes {
  responses: DateTimeResponseQuestionResResponse[]
}

export interface DateTimeResponseQuestionResResponse extends CommonResponseQuestionResponse {
  dateTime: string | null
}
