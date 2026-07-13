import {CommonResponseQuestionResponse} from './common-response-question-response';
import {OnlyCheckboxOptionRes} from '../../question/response/checkbox-res';

export interface CheckboxResponseQuestionRes {
  options: OnlyCheckboxOptionRes[],
  responses: CheckboxResponseQuestionResResponse[]
}

export interface CheckboxResponseQuestionResResponse extends CommonResponseQuestionResponse {
  optionIds: string[]
}
