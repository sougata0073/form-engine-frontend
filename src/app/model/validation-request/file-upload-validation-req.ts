import {ValidationReq} from './validation-req';
import {FileType} from '../../type/file-type';

export interface FileUploadValidationReq extends ValidationReq {
  fileUrl: string
  fileType: FileType,
  fileSizeInMb: number
}
