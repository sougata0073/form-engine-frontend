import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AnyQuestionRes} from '../type/any-question-res';
import {AnyQuestionAddUpdateReq} from '../type/any-question-add-update-req';
import {FormRes} from '../model/form/form-res';
import {FormAddUpdateReq} from '../model/form/form-add-update-req';
import {FormAddUpdateRes} from '../model/form/form-add-update-res';
import {QuestionAddUpdateRes} from '../model/edit-form/question/response/question-add-update-res';
import {SuccessMessage} from '../model/common/success-message';
import {QuestionType} from '../type/question-type';
import {debounce} from 'lodash';
import {untracked} from '@angular/core/primitives/signals';

@Injectable({
  providedIn: 'root',
})
export class EditFormService {

  private http = inject(HttpClient)

  private _formRes = signal<FormRes | null>(null)
  formRes = this._formRes.asReadonly()

  createForm(form: FormAddUpdateReq, onComplete?: (res: FormAddUpdateRes) => void) {
    const url = 'http://localhost:9092/api/v1/forms'
    this.http.post<FormAddUpdateRes>(url, form).subscribe(res => {
      onComplete?.(res)
    })
  }

  updateForm = debounce(
    (form: FormAddUpdateReq, onComplete?: () => void) => {
      const url = `http://localhost:9092/api/v1/forms/${this._formRes()?.id}`
      this.http.put<FormAddUpdateRes>(url, form).subscribe(res => {
        this._formRes.update(prev => {
          return {...prev!, ...res}
        })
        onComplete?.()
      })
    }, 500)

  loadFormRes(formId: string, onComplete?: () => void) {
    if (this._formRes()) {
      onComplete?.()
      return
    }

    const url = `http://localhost:9092/api/v1/forms/${formId}`
    this.http.get<FormRes>(url).subscribe(res => {
      console.log(res)
      this._formRes.set(res)
      onComplete?.()
    })
  }

  addQuestion(question: AnyQuestionAddUpdateReq, onComplete?: () => void) {
    const url = `http://localhost:9092/api/v1/forms/${this._formRes()?.id}/questions`
    this.http.post<AnyQuestionRes>(url, question).subscribe(res => {
      this._formRes.update(prev => {
        return {...prev!, questions: [...prev!.questions, res]}
      })

      onComplete?.()
    })
  }

  updateQuestion = debounce(
    (
      questionId: string,
      question: AnyQuestionAddUpdateReq,
      onComplete?: (res: AnyQuestionRes) => void
    ) => {
      const url = `http://localhost:9092/api/v1/forms/${this._formRes()?.id}/questions/${questionId}`;
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
    500
  );

  deleteQuestion(questionId: string, questionType: QuestionType, onComplete?: () => void) {
    const url = `http://localhost:9092/api/v1/forms/${this._formRes()?.id}/questions/${questionId}`
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
