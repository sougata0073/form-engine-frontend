import {Component, signal} from '@angular/core';
import {EditFormResponseQuestionComponent} from '../../../../../type/edit-form-response-question-component';
import {
  CheckboxResponseQuestionRes
} from '../../../../../model/edit-form/responses/question/checkbox-response-question-res';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {
  EditFormResponsesQuestionBlankResponse
} from '../../../../../shared/edit-form-responses-question-blank-response/edit-form-responses-question-blank-response';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-edit-form-response-question-checkbox',
  imports: [
    MatCard,
    MatCardContent,
    MatButton,
    MatIcon,
    ReactiveFormsModule,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    EditFormResponsesQuestionBlankResponse,
    MatCheckbox
  ],
  templateUrl: './edit-form-response-question-checkbox.html',
  styleUrl: './edit-form-response-question-checkbox.scss',
})
export class EditFormResponseQuestionCheckbox extends EditFormResponseQuestionComponent<CheckboxResponseQuestionRes> {

  protected isOptionsVisible = signal<boolean>(false)

  getOptionFromId(id: string) {
    return this.response().options.find(op => op.id === id);
  }

}
