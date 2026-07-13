import {CommonResponseQuestionResponse} from './common-response-question-response';

export interface LinearScaleResponseQuestionRes {
  responses: LinearScaleResponseQuestionResResponse[]
}

export interface LinearScaleResponseQuestionResResponse extends CommonResponseQuestionResponse {
  scale: number | null
}
