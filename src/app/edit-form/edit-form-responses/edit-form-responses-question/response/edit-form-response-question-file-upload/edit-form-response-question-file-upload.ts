import { Component } from '@angular/core';
import {EditFormResponseQuestionComponent} from '../../../../../type/edit-form-response-question-component';
import {
  FileUploadResponseQuestionRes
} from '../../../../../model/edit-form/responses/question/file-upload-response-question-res';
import {
    EditFormResponsesQuestionBlankResponse
} from "../../../../../shared/edit-form-responses-question-blank-response/edit-form-responses-question-blank-response";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-edit-form-response-question-file-upload',
  imports: [
    EditFormResponsesQuestionBlankResponse,
    MatButton,
    MatCard,
    MatCardContent,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatTooltip
  ],
  templateUrl: './edit-form-response-question-file-upload.html',
  styleUrl: './edit-form-response-question-file-upload.scss',
})
export class EditFormResponseQuestionFileUpload extends EditFormResponseQuestionComponent<FileUploadResponseQuestionRes> {

}
