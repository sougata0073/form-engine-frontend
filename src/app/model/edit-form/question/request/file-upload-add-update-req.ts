import {QuestionAddUpdateReq} from './question-add-update-req';
import {FileType} from '../../../../type/file-type';

export interface OnlyFileUploadAddUpdateReq {
  allowedFileCategories: string[],
  maxFileSize: number
}

export interface FileUploadAddUpdateReq extends QuestionAddUpdateReq, OnlyFileUploadAddUpdateReq {
}
