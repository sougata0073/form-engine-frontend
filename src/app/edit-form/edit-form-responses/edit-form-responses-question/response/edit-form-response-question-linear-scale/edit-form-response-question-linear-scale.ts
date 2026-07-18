import {Component, OnInit, signal} from '@angular/core';
import {EditFormResponseQuestionComponent} from '../../../../../type/edit-form-response-question-component';
import {
  LinearScaleResponseQuestionRes
} from '../../../../../model/edit-form/responses/question/linear-scale-response-question-res';
import {
  EditFormResponsesQuestionBlankResponse
} from "../../../../../shared/edit-form-responses-question-blank-response/edit-form-responses-question-blank-response";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {ArrayUtil} from '../../../../../util/array-util';

@Component({
  selector: 'app-edit-form-response-question-linear-scale',
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
  templateUrl: './edit-form-response-question-linear-scale.html',
  styleUrl: './edit-form-response-question-linear-scale.scss',
})
export class EditFormResponseQuestionLinearScale extends EditFormResponseQuestionComponent<LinearScaleResponseQuestionRes> {

  protected scaleNums = signal<number[]>([])

  override ngOnInit() {
    super.ngOnInit();

    this.scaleNums.set(ArrayUtil.fillByNumbers(this.response().fromNumber, this.response().toNumber))
  }

}
