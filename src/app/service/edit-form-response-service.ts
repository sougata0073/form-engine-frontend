import {inject, Injectable, signal} from '@angular/core';
import {FormRes} from '../model/form/form-res';
import {FormResponseByQuestionRes} from '../model/edit-form/responses/form-response-by-question-res';
import {HttpClient} from '@angular/common/http';
import {FormResponseSummary} from '../model/form/form-response-summary';
import {QuestionSummary} from '../model/question/question-summary';
import {QuestionSummariesRes} from '../model/question/question-summaries-res';

@Injectable({
  providedIn: 'root',
})
export class EditFormResponseService {

  private http = inject(HttpClient)

  private formResponseSummary?: FormResponseSummary
  private questionSummaries?: QuestionSummariesRes

  loadFormResponseSummary(formId: string, onComplete: (res: FormResponseSummary) => void) {
    if (this.formResponseSummary) {
      onComplete(this.formResponseSummary)
      return
    }

    const url = 'http://localhost:9093/api/v1/response/summary'

    this.http.get<FormResponseSummary>(url, {params: {'formId': formId}}).subscribe(res => {
      this.formResponseSummary = res
      onComplete(res)
    })
  }

  loadQuestionSummaries(formId: string, onComplete: (res: QuestionSummariesRes) => void) {
    if (this.questionSummaries) {
      onComplete(this.questionSummaries)
      return
    }

    const url = `http://localhost:9092/api/v1/forms/${formId}/question-summaries`

    this.http.get<QuestionSummariesRes>(url, {params: {'formId': formId}}).subscribe(res => {
      this.questionSummaries = res
      onComplete(res)
    })
  }


}
