import {Component} from '@angular/core';
import {EditFormResponseQuestionComponent} from '../../../../../type/edit-form-response-question-component';
import {
  DateTimeResponseQuestionRes
} from '../../../../../model/edit-form/responses/question/date-time-response-question-res';
import {DatePipe} from "@angular/common";
import {
    EditFormResponsesQuestionBlankResponse
} from "../../../../../shared/edit-form-responses-question-blank-response/edit-form-responses-question-blank-response";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-edit-form-response-question-date-time',
  imports: [
    DatePipe,
    EditFormResponsesQuestionBlankResponse,
    MatButton,
    MatCard,
    MatCardContent,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ],
  templateUrl: './edit-form-response-question-date-time.html',
  styleUrl: './edit-form-response-question-date-time.scss',
})
export class EditFormResponseQuestionDateTime extends EditFormResponseQuestionComponent<DateTimeResponseQuestionRes> {

}
