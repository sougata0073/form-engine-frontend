import {Component, OnInit, signal} from '@angular/core';
import {EditFormResponseSummaryComponent} from '../../../../../type/edit-form-response-summary-component';
import {
  ParagraphResponseSummaryRes
} from '../../../../../model/edit-form/responses/summary/paragraph-response-summary-res';

@Component({
  selector: 'app-edit-form-response-summary-paragraph',
  imports: [],
  templateUrl: './edit-form-response-summary-paragraph.html',
  styleUrl: './edit-form-response-summary-paragraph.scss',
})
export class EditFormResponseSummaryParagraph extends EditFormResponseSummaryComponent<ParagraphResponseSummaryRes> implements OnInit {

  protected responses = signal<string[]>([])

  ngOnInit() {
    this.responses.set(this.responseSummary().responses)
  }

}
