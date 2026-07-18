import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormResponseSummary} from '../model/form/form-response-summary';
import {QuestionSummariesRes} from '../model/question/question-summaries-res';
import {AnyResponseSummaryRes} from '../type/any-response-summary-res';
import {ResponseSummaryRes} from '../model/edit-form/responses/summary/response-summary-res';
import {AnyResponseQuestionRes} from '../type/any-response-question-res';
import {AllResponseCountAndIds} from '../model/edit-form/responses/question/all-response-count-and-ids';

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

  private _responseByQuestion = signal<AnyResponseQuestionRes | null>(null)
  responseByQuestion = this._responseByQuestion.asReadonly()

  private _allResponseCountAndSummaries = signal<AllResponseCountAndIds | null>(null)
  allResponseCountAndSummaries = this._allResponseCountAndSummaries.asReadonly()

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

  loadResponseByQuestion(formId: string, questionId: string, onComplete: (res: AnyResponseQuestionRes) => void) {

    const prev = this._responseByQuestion()

    if (prev && prev.questionId === questionId) {
      onComplete(prev)
      return
    }

    const url = `http://localhost:9093/api/v1/forms/${formId}/questions/${questionId}/response`

    this.http.get<AnyResponseQuestionRes>(url).subscribe(res => {
      this._responseByQuestion.set(res)
      onComplete(res)
    })
  }

  loadAllResponseCountAndSummaries(formId: string, onComplete: (res: AllResponseCountAndIds) => void) {

    const prev = this._allResponseCountAndSummaries()

    if (prev) {
      onComplete(prev)
      return
    }

    const url = `http://localhost:9093/api/v1/forms/${formId}/all-response-count-and-ids`

    this.http.get<AllResponseCountAndIds>(url).subscribe(res => {
      this._allResponseCountAndSummaries.set(res)
      onComplete(res)
    })
  }

}
