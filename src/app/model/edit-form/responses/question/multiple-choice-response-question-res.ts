import {CommonResponseQuestionResponse} from './common-response-question-response';
import {OnlyMultipleChoiceOptionRes} from '../../question/response/multiple-choice-res';

export interface MultipleChoiceResponseQuestionRes {
  options: OnlyMultipleChoiceOptionRes[],
  responses: MultipleChoiceResponseQuestionResResponse[]
}

export interface MultipleChoiceResponseQuestionResResponse extends CommonResponseQuestionResponse {
  optionId: string | null
}
