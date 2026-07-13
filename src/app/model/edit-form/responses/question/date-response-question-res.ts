import {CommonResponseQuestionResponse} from './common-response-question-response';

export interface DateResponseQuestionRes {
  responses: DateResponseQuestionResResponse[]
}

export interface DateResponseQuestionResResponse extends CommonResponseQuestionResponse {
  date: string | null
}
