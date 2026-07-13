import {CommonResponseQuestionResponse} from './common-response-question-response';
import {
  OnlyMultipleChoiceGridColumnRes,
  OnlyMultipleChoiceGridRowRes
} from '../../question/response/multiple-choice-grid-res';

export interface MultipleChoiceGridResponseQuestionRes {
  rows: OnlyMultipleChoiceGridRowRes[],
  columns: OnlyMultipleChoiceGridColumnRes[],
  responses: MultipleChoiceGridResponseQuestionResRow[]
}

export interface MultipleChoiceGridResponseQuestionResRow {
  rowId: string,
  responses: MultipleChoiceGridResponseQuestionResColumn[]
}

export interface MultipleChoiceGridResponseQuestionResColumn extends CommonResponseQuestionResponse {
  columnId: string | null
}
