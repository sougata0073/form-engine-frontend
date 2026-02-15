import {Component, inject, input, signal} from '@angular/core';
import {QuestionCard} from '../../shared/question-card/question-card';
import {EditFormStateService} from '../../service/edit-form-state-service';
import {ViewFormStateService} from '../../service/view-form-state-service';
import {ViewFormService} from '../../service/view-form-service';
import {EditFormService} from '../../service/edit-form-service';
import {FormRes} from '../../model/form/form-res';

@Component({
  selector: 'app-view-form-info',
  imports: [
    QuestionCard
  ],
  templateUrl: './view-form-info.html',
  styleUrl: './view-form-info.scss',
})
export class ViewFormInfo {

  formRes = input.required<FormRes>()
}
