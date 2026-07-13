import {QuestionResponsePutReq} from './question-response-put-req';

export interface OnlyFileUploadResponsePutReq {
  fileName: string | null,
  fileUrl: string | null,
  fileMimeType: string | null,
  fileSize: number | null
}

export interface FileUploadResponsePutReq extends QuestionResponsePutReq, OnlyFileUploadResponsePutReq {
}
