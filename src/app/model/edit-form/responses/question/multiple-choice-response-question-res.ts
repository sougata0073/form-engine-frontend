import {CommonResponseQuestionResponse} from './common-response-question-response';
import {OnlyMultipleChoiceOptionRes} from '../../question/response/multiple-choice-res';
import {ResponseQuestion} from './response-question';

export interface MultipleChoiceResponseQuestionRes extends ResponseQuestion<MultipleChoiceResponseQuestionResResponse> {
  options: OnlyMultipleChoiceOptionRes[],
}

export interface MultipleChoiceResponseQuestionResResponse extends CommonResponseQuestionResponse {
  optionId: string
}
