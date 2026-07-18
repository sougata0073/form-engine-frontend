import {CommonResponseQuestionResponse} from './common-response-question-response';
import {ResponseQuestion} from './response-question';

export interface FileUploadResponseQuestionRes extends ResponseQuestion<FileUploadResponseQuestionResResponse> {
}

export interface FileUploadResponseQuestionResResponse extends CommonResponseQuestionResponse {
  fileName: string,
  fileUrl: string,
  fileMimeType: string
}
