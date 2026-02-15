import {AnyQuestionResponsePutReq} from '../../type/any-question-response-put-req';

export interface FormResponsePutReq {
  formId: string,
  responses: AnyQuestionResponsePutReq[]
}
