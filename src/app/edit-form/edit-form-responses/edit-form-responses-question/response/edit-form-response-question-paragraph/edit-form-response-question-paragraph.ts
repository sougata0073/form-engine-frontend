import { Component } from '@angular/core';
import {EditFormResponseQuestionComponent} from '../../../../../type/edit-form-response-question-component';
import {
  ParagraphResponseQuestionRes
} from '../../../../../model/edit-form/responses/question/paragraph-response-question-res';
import {
    EditFormResponsesQuestionBlankResponse
} from "../../../../../shared/edit-form-responses-question-blank-response/edit-form-responses-question-blank-response";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-edit-form-response-question-paragraph',
  imports: [
    EditFormResponsesQuestionBlankResponse,
    MatButton,
    MatCard,
    MatCardContent,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ],
  templateUrl: './edit-form-response-question-paragraph.html',
  styleUrl: './edit-form-response-question-paragraph.scss',
})
export class EditFormResponseQuestionParagraph extends EditFormResponseQuestionComponent<ParagraphResponseQuestionRes> {

}
