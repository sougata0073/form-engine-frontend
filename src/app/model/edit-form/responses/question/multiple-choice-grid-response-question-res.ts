import {CommonResponseQuestionResponse} from './common-response-question-response';
import {
  OnlyMultipleChoiceGridColumnRes,
  OnlyMultipleChoiceGridRowRes
} from '../../question/response/multiple-choice-grid-res';
import {ResponseQuestion} from './response-question';

export interface MultipleChoiceGridResponseQuestionRes extends ResponseQuestion<MultipleChoiceGridResponseQuestionResRow> {
  rows: OnlyMultipleChoiceGridRowRes[],
  columns: OnlyMultipleChoiceGridColumnRes[],
}

export interface MultipleChoiceGridResponseQuestionResRow {
  rowId: string,
  responses: MultipleChoiceGridResponseQuestionResColumn[]
}

export interface MultipleChoiceGridResponseQuestionResColumn extends CommonResponseQuestionResponse {
  columnId: string
}
