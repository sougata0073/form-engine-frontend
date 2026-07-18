import { Component } from '@angular/core';
import {EditFormResponseQuestionComponent} from '../../../../../type/edit-form-response-question-component';
import {
  ShortAnswerResponseQuestionRes
} from '../../../../../model/edit-form/responses/question/short-answer-response-question-res';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {
  EditFormResponsesQuestionBlankResponse
} from '../../../../../shared/edit-form-responses-question-blank-response/edit-form-responses-question-blank-response';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-edit-form-response-question-short-answer',
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    EditFormResponsesQuestionBlankResponse,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ],
  templateUrl: './edit-form-response-question-short-answer.html',
  styleUrl: './edit-form-response-question-short-answer.scss',
})
export class EditFormResponseQuestionShortAnswer extends EditFormResponseQuestionComponent<ShortAnswerResponseQuestionRes> {

}
