import {Component, signal} from '@angular/core';
import {EditFormResponseQuestionComponent} from '../../../../../type/edit-form-response-question-component';
import {
  DropdownResponseQuestionRes
} from '../../../../../model/edit-form/responses/question/dropdown-response-question-res';
import {
    EditFormResponsesQuestionBlankResponse
} from "../../../../../shared/edit-form-responses-question-blank-response/edit-form-responses-question-blank-response";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-edit-form-response-question-dropdown',
  imports: [
    EditFormResponsesQuestionBlankResponse,
    MatButton,
    MatCard,
    MatCardContent,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ],
  templateUrl: './edit-form-response-question-dropdown.html',
  styleUrl: './edit-form-response-question-dropdown.scss',
})
export class EditFormResponseQuestionDropdown extends EditFormResponseQuestionComponent<DropdownResponseQuestionRes> {

  protected isOptionsVisible = signal<boolean>(false)

  getOptionFromId(id: string) {
    return this.response().options.find(op => op.id === id);
  }

}
