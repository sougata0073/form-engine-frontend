import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AnyQuestionRes} from '../type/any-question-res';
import {AnyQuestionAddUpdateReq} from '../type/any-question-add-update-req';
import {FormRes} from '../model/form/form-res';
import {FormAddUpdateReq} from '../model/form/form-add-update-req';
import {SuccessMessage} from '../model/common/success-message';
import {QuestionType} from '../type/question-type';
import {debounce} from 'lodash';
import {FormInfoRes} from '../model/form/form-info-res';

@Injectable({
  providedIn: 'root',
})
export class EditFormQuestionService {

  private http = inject(HttpClient)

  private _formInfo = signal<FormInfoRes | null>(null)
  formInfo = this._formInfo.asReadonly()

  private _formRes = signal<FormRes | null>(null)
  formRes = this._formRes.asReadonly()

  createForm(form: FormAddUpdateReq, onComplete?: (res: FormInfoRes) => void) {
    const url = 'http://localhost:9092/api/v1/forms'

    this.http.post<FormInfoRes>(url, form).subscribe(res => {
      onComplete?.(res)
    })

  }

  updateFormInfo = debounce(
    (formId: string, form: FormAddUpdateReq, onComplete?: (res: FormInfoRes) => void) => {

      const url = `http://localhost:9092/api/v1/forms/${formId}`

      this.http.put<FormInfoRes>(url, form).subscribe(res => {
        this._formInfo.set(res)
        this._formRes.update(prev => {
          return {...prev!, ...res}
        })

        onComplete?.(res)
      })
    }, 1000)

  loadFormInfo(formId: string, onComplete: (res: FormInfoRes) => void) {
    const url = `http://localhost:9092/api/v1/forms/${formId}/info`

    this.http.get<FormInfoRes>(url).subscribe(res => {
      this._formInfo.set(res)
      onComplete(res)
    })
  }

  loadFormRes(formId: string, onComplete?: (res: FormRes) => void) {
    const prev = this._formRes()
    if (prev) {

      onComplete?.(prev)

      return
    }

    const url = `http://localhost:9092/api/v1/forms/${formId}`

    this.http.get<FormRes>(url).subscribe(res => {

      this._formRes.set(res)

      onComplete?.(res)
    })
  }

  addQuestion(question: AnyQuestionAddUpdateReq, onComplete?: (res: FormRes) => void) {

    const url = `http://localhost:9092/api/v1/forms/${this._formRes()!.id}/questions`

    this.http.post<AnyQuestionRes>(url, question).subscribe(res => {

      this._formRes.update(prev => {
        return {...prev!, questions: [...prev!.questions, res]}
      })

      const form = this._formRes()

      if (form) {
        onComplete?.(form)
      }
    })
  }

  updateQuestion = debounce(
    (
      questionId: string,
      question: AnyQuestionAddUpdateReq,
      onComplete?: (res: AnyQuestionRes) => void
    ) => {

      const url = `http://localhost:9092/api/v1/forms/${this._formRes()!.id}/questions/${questionId}`;

      this.http.put<AnyQuestionRes>(url, question).subscribe(res => {

        this._formRes.update(prev => {
          const newQuestions = prev!.questions.map(q =>
            q.id === res.id ? structuredClone(res) : structuredClone(q)
          );
          return {...prev!, questions: newQuestions};
        });

        onComplete?.(res);
      });
    },
    1000
  );

  deleteQuestion(questionId: string, questionType: QuestionType, onComplete?: () => void) {

    const url = `http://localhost:9092/api/v1/forms/${this._formRes()!.id}/questions/${questionId}`

    this.http.delete<SuccessMessage>(url, {params: {questionType: questionType}})
      .subscribe(() => {
        this._formRes.update(prev => {
          const newQuestions = prev!.questions.filter(q => q.id !== questionId)
          return {...prev!, questions: newQuestions}
        })

        onComplete?.()
      })
  }

  close() {
  }

}
