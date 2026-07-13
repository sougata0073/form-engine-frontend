import {CommonResponseQuestionResponse} from './common-response-question-response';

export interface DurationResponseQuestionRes {
  responses: DurationResponseQuestionResResponse[]
}

export interface DurationResponseQuestionResResponse extends CommonResponseQuestionResponse {
  hours: number | null,
  minutes: number | null,
  seconds: number | null
}
