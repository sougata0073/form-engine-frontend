import {QuestionResponsePutReq} from './question-response-put-req';

export interface OnlyFileUploadResponsePutReq {
  fileUrl: string,
  fileMimeType: string,
  fileSize: number
}

export interface FileUploadResponsePutReq extends QuestionResponsePutReq, OnlyFileUploadResponsePutReq {
}
