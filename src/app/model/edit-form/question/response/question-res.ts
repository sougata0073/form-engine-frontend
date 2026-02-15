import {QuestionAddUpdateReq} from '../request/question-add-update-req';

export interface QuestionRes extends QuestionAddUpdateReq {
  id: string,
  orderIndex: number
}
