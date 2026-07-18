import { Component } from '@angular/core';
import {EditFormResponseQuestionComponent} from '../../../../../type/edit-form-response-question-component';
import {DateResponseQuestionRes} from '../../../../../model/edit-form/responses/question/date-response-question-res';
import {
    EditFormResponsesQuestionBlankResponse
} from "../../../../../shared/edit-form-responses-question-blank-response/edit-form-responses-question-blank-response";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-edit-form-response-question-date',
  imports: [
    EditFormResponsesQuestionBlankResponse,
    MatButton,
    MatCard,
    MatCardContent,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    DatePipe
  ],
  templateUrl: './edit-form-response-question-date.html',
  styleUrl: './edit-form-response-question-date.scss',
})
export class EditFormResponseQuestionDate extends EditFormResponseQuestionComponent<DateResponseQuestionRes> {

}
