import {CommonResponseQuestionResponse} from './common-response-question-response';
import {OnlyDropdownOptionRes} from '../../question/response/dropdown-res';
import {ResponseQuestion} from './response-question';

export interface DropdownResponseQuestionRes extends ResponseQuestion<DropdownResponseQuestionResResponse> {
  options: OnlyDropdownOptionRes[]
}

export interface DropdownResponseQuestionResResponse extends CommonResponseQuestionResponse {
  optionId: string
}
