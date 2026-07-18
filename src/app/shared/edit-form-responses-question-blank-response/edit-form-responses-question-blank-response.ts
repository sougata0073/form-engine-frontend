import {Component, input, output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {FormResponseSummary} from '../../model/edit-form/responses/question/all-response-count-and-ids';

@Component({
  selector: 'app-edit-form-responses-question-blank-response',
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ],
  templateUrl: './edit-form-responses-question-blank-response.html',
  styleUrl: './edit-form-responses-question-blank-response.scss',
})
export class EditFormResponsesQuestionBlankResponse {

  responseCount = input.required<number>()
  responseSummaries = input.required<FormResponseSummary[]>()

  responseIdClick = output<string>()
}
