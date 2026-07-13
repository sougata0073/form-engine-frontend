import {CommonResponseQuestionResponse} from './common-response-question-response';

export interface FileUploadResponseQuestionRes {
  responses: FileUploadResponseQuestionResResponse[]
}

export interface FileUploadResponseQuestionResResponse extends CommonResponseQuestionResponse {
  fileName: string | null,
  fileUrl: string | null,
  fileMimeType: string | null
}
