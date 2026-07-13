import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormResponseSummary} from '../model/form/form-response-summary';
import {QuestionSummariesRes} from '../model/question/question-summaries-res';
import {AnyResponseSummaryRes} from '../type/any-response-summary-res';
import {ResponseSummaryRes} from '../model/edit-form/responses/summary/response-summary-res';

@Injectable({
  providedIn: 'root',
})
export class EditFormResponseService {

  private http = inject(HttpClient)

  private _formResponseSummary = signal<FormResponseSummary | null>(null)
  formResponseSummary = this._formResponseSummary.asReadonly()

  private _questionSummaries = signal<QuestionSummariesRes | null>(null)
  questionSummaries = this._questionSummaries.asReadonly()

  private _responseSummaries = signal<ResponseSummaryRes | null>(null)
  responseSummaries = this._responseSummaries.asReadonly()

  loadFormResponseSummary(formId: string, onComplete: (res: FormResponseSummary) => void) {
    const prev = this._formResponseSummary()
    if (prev) {
      onComplete(prev)
      return
    }

    const url = `http://localhost:9093/api/v1/forms/${formId}/response-summary`

    this.http.get<FormResponseSummary>(url).subscribe(res => {
      this._formResponseSummary.set(res)
      onComplete(res)
    })
  }

  loadQuestionSummaries(formId: string, onComplete: (res: QuestionSummariesRes) => void) {
    const prev = this._questionSummaries()
    if (prev) {
      onComplete(prev)
      return
    }

    const url = `http://localhost:9092/api/v1/forms/${formId}/question-summaries`

    this.http.get<QuestionSummariesRes>(url, {params: {'formId': formId}}).subscribe(res => {
      this._questionSummaries.set(res)
      onComplete(res)
    })
  }

  loadResponseSummaries(formId: string, onComplete: (res: ResponseSummaryRes) => void) {
    const prev = this._responseSummaries()
    if (prev) {
      onComplete(prev)
      return
    }

    const url = `http://localhost:9093/api/v1/forms/${formId}/response-summaries`

    this.http.get<ResponseSummaryRes>(url).subscribe(res => {
      this._responseSummaries.set(res)
      onComplete(res)
    })

  }


}
