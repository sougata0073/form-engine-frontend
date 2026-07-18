import {CommonResponseQuestionResponse} from './common-response-question-response';
import {OnlyTickBoxGridColumnRes, OnlyTickBoxGridRowRes} from '../../question/response/tick-box-grid-res';
import {ResponseQuestion} from './response-question';

export interface TickBoxGridResponseQuestionRes extends ResponseQuestion<TickBoxGridResponseQuestionResRow> {
  rows: OnlyTickBoxGridRowRes[],
  columns: OnlyTickBoxGridColumnRes[],
}

export interface TickBoxGridResponseQuestionResRow {
  rowId: string,
  responses: TickBoxGridResponseQuestionResColumn[]
}

export interface TickBoxGridResponseQuestionResColumn extends CommonResponseQuestionResponse {
  columnIds: string
}
