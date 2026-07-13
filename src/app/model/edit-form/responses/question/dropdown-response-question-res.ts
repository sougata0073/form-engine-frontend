import {CommonResponseQuestionResponse} from './common-response-question-response';
import {OnlyDropdownOptionRes} from '../../question/response/dropdown-res';

export interface DropdownResponseQuestionRes {
  options: OnlyDropdownOptionRes[]
  responses: DropdownResponseQuestionResResponse[]
}

export interface DropdownResponseQuestionResResponse extends CommonResponseQuestionResponse {
  optionId: string | null
}
