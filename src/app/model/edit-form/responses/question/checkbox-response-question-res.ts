import {CommonResponseQuestionResponse} from './common-response-question-response';
import {OnlyCheckboxOptionRes} from '../../question/response/checkbox-res';
import {ResponseQuestion} from './response-question';

export interface CheckboxResponseQuestionRes extends ResponseQuestion<CheckboxResponseQuestionResResponse> {
  options: OnlyCheckboxOptionRes[]
}

export interface CheckboxResponseQuestionResResponse extends CommonResponseQuestionResponse {
  optionIds: string[]
}
