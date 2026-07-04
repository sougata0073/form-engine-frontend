import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {EditFormInfo} from './edit-form-info/edit-form-info';
import {EditFormQuestionService} from '../../service/edit-form-question-service';
import {EditFormQuestionWrapper} from './edit-form-question-wrapper/edit-form-question-wrapper';
import {MatIcon} from '@angular/material/icon';
import {MatFabButton} from '@angular/material/button';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {DefaultQuestionAddUpdateReq} from '../../constant/default-question-add-update-req';
import {QuestionAddUpdateReq} from '../../model/edit-form/question/request/question-add-update-req';
import {AnyOnlyQuestionAddUpdateReq} from '../../type/any-only-question-add-update-req';
import {AnyQuestionAddUpdateReq} from '../../type/any-question-add-update-req';
import {EditFormStateService} from '../../service/edit-form-state-service';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {FormRes} from '../../model/form/form-res';

@Component({
  selector: 'app-edit-form-questions',
  imports: [
    EditFormInfo,
    EditFormQuestionWrapper,
    MatIcon,
    MatFabButton,
    MatProgressSpinner,
  ],
  templateUrl: './edit-form-questions.html',
  styleUrl: './edit-form-questions.scss'
})
export class EditFormQuestions implements OnInit, OnDestroy {

  protected formId = signal<string>('')

  protected editFormService = inject(EditFormQuestionService)
  private title = inject(Title)
  protected activatedRoute = inject(ActivatedRoute)

  protected formRes = signal<FormRes | null>(null)

  protected editFormStateService = inject(EditFormStateService)

  ngOnInit() {
    this.activatedRoute.parent!.paramMap.subscribe(params => {

      this.formId.set(params.get('formId')!);

      this.editFormService.loadFormRes(this.formId(), (res) => {
        this.formRes.set(res)

        let formTitle = this.formRes()!.title

        if (formTitle) {
          formTitle += ' - Form engine'
        } else {
          formTitle = 'Form engine'
        }
        this.title.setTitle(formTitle)

        this.activatedRoute.queryParams.subscribe(val => {
          if (val['publishedOptions']) {

          }
        })
      })
    })
  }

  ngOnDestroy() {
    this.editFormService.close()
  }

  protected onAddQuestionClick() {
    this.editFormStateService.isFormGettingModified.set(true)

    const questionAddUpdateReq: QuestionAddUpdateReq = {
      question: null,
      description: null,
      required: false,
      questionType: 'SHORT_ANSWER',
      orderIndex: this.formRes()?.questions.length ?? 0
    }
    const onlyQuestionAddUpdateReq: AnyOnlyQuestionAddUpdateReq =
      DefaultQuestionAddUpdateReq.get('SHORT_ANSWER')

    const question: AnyQuestionAddUpdateReq = {
      ...questionAddUpdateReq,
      ...structuredClone(onlyQuestionAddUpdateReq)
    }

    this.editFormService.addQuestion(question, () => {
      this.editFormStateService.isFormGettingModified.set(false)
    })
  }

}
