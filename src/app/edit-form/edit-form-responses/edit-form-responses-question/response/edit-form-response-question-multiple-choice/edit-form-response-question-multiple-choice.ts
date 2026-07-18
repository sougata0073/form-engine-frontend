import {Component, signal} from '@angular/core';
import {EditFormResponseQuestionComponent} from '../../../../../type/edit-form-response-question-component';
import {
  MultipleChoiceResponseQuestionRes
} from '../../../../../model/edit-form/responses/question/multiple-choice-response-question-res';
import {
    EditFormResponsesQuestionBlankResponse
} from "../../../../../shared/edit-form-responses-question-blank-response/edit-form-responses-question-blank-response";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatRadioButton} from '@angular/material/radio';

@Component({
  selector: 'app-edit-form-response-question-multiple-choice',
  imports: [
    EditFormResponsesQuestionBlankResponse,
    MatButton,
    MatCard,
    MatCardContent,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatRadioButton
  ],
  templateUrl: './edit-form-response-question-multiple-choice.html',
  styleUrl: './edit-form-response-question-multiple-choice.scss',
})
export class EditFormResponseQuestionMultipleChoice extends EditFormResponseQuestionComponent<MultipleChoiceResponseQuestionRes> {

  protected isOptionsVisible = signal<boolean>(false)

  getOptionFromId(id: string) {
    return this.response().options.find(op => op.id === id);
  }

}
