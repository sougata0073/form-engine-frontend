import {Component} from '@angular/core';
import {ViewFormQuestionComponent} from '../../../type/view-form-question-component';
import {DurationRes} from '../../../model/edit-form/question/response/duration-res';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {OnlyDurationResponsePutReq} from '../../../model/view-form/request/duration-response-put-req';
import {every} from 'rxjs';

@Component({
  selector: 'app-view-form-duration',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatError
  ],
  templateUrl: './view-form-duration.html',
  styleUrl: './view-form-duration.scss',
})
export class ViewFormDuration extends ViewFormQuestionComponent<DurationRes, OnlyDurationResponsePutReq> {

  override formGroup = new FormGroup({
    hours: new FormControl<number | null>(null),
    minutes: new FormControl<number | null>(null),
    seconds: new FormControl<number | null>(null)
  })

  override getOnlyQuestionResponsePutReq(): OnlyDurationResponsePutReq | null {
    const values = this.formGroup.value
    const h = values.hours
    const m = values.minutes
    const s = values.seconds

    if (h === null && m === null && s === null) return null

    return {
      hours: h ?? 0,
      minutes: m ?? 0,
      seconds: s ?? 0
    }
  }
}
