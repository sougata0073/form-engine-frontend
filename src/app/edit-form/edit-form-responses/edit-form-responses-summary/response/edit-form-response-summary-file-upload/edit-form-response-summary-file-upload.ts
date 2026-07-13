import {Component} from '@angular/core';
import {MatTooltip} from '@angular/material/tooltip';
import {EditFormResponseSummaryComponent} from '../../../../../type/edit-form-response-summary-component';
import {
  FileUploadResponseSummaryRes
} from '../../../../../model/edit-form/responses/summary/file-upload-response-summary-res';

@Component({
  selector: 'app-edit-form-response-summary-file-upload',
  imports: [
    MatTooltip
  ],
  templateUrl: './edit-form-response-summary-file-upload.html',
  styleUrl: './edit-form-response-summary-file-upload.scss',
})
export class EditFormResponseSummaryFileUpload extends EditFormResponseSummaryComponent<FileUploadResponseSummaryRes> {

}
