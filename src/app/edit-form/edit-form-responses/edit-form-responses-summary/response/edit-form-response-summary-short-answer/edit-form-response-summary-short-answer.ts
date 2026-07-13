import {Component, OnInit, signal} from '@angular/core';
import {
  ShortAnswerResponseSummaryRes
} from '../../../../../model/edit-form/responses/summary/short-answer-response-summary-res';
import {EditFormResponseSummaryComponent} from '../../../../../type/edit-form-response-summary-component';

@Component({
  selector: 'app-edit-form-response-summary-short-answer',
  imports: [],
  templateUrl: './edit-form-response-summary-short-answer.html',
  styleUrl: './edit-form-response-summary-short-answer.scss',
})
export class EditFormResponseSummaryShortAnswer extends EditFormResponseSummaryComponent<ShortAnswerResponseSummaryRes> implements OnInit {

  protected responses = signal<string[]>([])

  ngOnInit() {
    this.responses.set(this.responseSummary().responses)
  }

}
