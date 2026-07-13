import {Component, inject, OnInit, signal} from '@angular/core';
import {EditFormResponseSummaryWrapper} from './edit-form-response-summary-wrapper/edit-form-response-summary-wrapper';
import {EditFormResponseService} from '../../../service/edit-form-response-service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-form-responses-summary',
  imports: [
    EditFormResponseSummaryWrapper
  ],
  templateUrl: './edit-form-responses-summary.html',
  styleUrl: './edit-form-responses-summary.scss',
})
export class EditFormResponsesSummary implements OnInit {

  formId = signal<string>('')

  private activatedRoute = inject(ActivatedRoute)
  private responseService = inject(EditFormResponseService)

  protected responseSummaries = this.responseService.responseSummaries

  ngOnInit() {

    this.activatedRoute.parent!.parent!.paramMap.subscribe(params => {
      this.formId.set(params.get('formId')!);

      this.responseService.loadResponseSummaries(this.formId(), res => {

      })
    })

  }

}
