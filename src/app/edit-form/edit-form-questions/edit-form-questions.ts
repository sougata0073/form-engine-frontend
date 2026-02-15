import {Component, inject, input, OnDestroy, OnInit, signal,} from '@angular/core';
import {EditFormInfo} from './edit-form-info/edit-form-info';
import {EditFormService} from '../../service/edit-form-service';
import {EditFormQuestionWrapper} from './edit-form-question-wrapper/edit-form-question-wrapper';
import {MatIcon} from '@angular/material/icon';
import {MatFabButton} from '@angular/material/button';
import {ShortAnswerAddUpdateReq} from '../../model/edit-form/question/request/short-answer-add-update-req';
import {AnyShortAnswerValidationConfig} from '../../type/any-short-answer-validation-config';
import {ActivatedRoute, Router} from '@angular/router';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {Title} from '@angular/platform-browser';
import {DefaultQuestionAddUpdateReq} from '../../constant/default-question-add-update-req';
import {QuestionAddUpdateReq} from '../../model/edit-form/question/request/question-add-update-req';
import {AnyOnlyQuestionAddUpdateReq} from '../../type/any-only-question-add-update-req';
import {AnyQuestionAddUpdateReq} from '../../type/any-question-add-update-req';

@Component({
  selector: 'app-edit-form-questions',
  imports: [
    EditFormInfo,
    EditFormQuestionWrapper,
    MatIcon,
    MatFabButton,
  ],
  templateUrl: './edit-form-questions.html',
  styleUrl: './edit-form-questions.scss'
})
export class EditFormQuestions implements OnInit, OnDestroy {

  protected editFormService = inject(EditFormService)
  private title = inject(Title)
  protected activatedRoute = inject(ActivatedRoute)

  protected formRes = this.editFormService.formRes

  ngOnInit() {
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
  }

  ngOnDestroy() {
    this.editFormService.close()
  }

  protected onAddQuestionClick() {
    const questionAddUpdateReq: QuestionAddUpdateReq = {
      question: null,
      description: null,
      required: false,
      questionType: 'SHORT_ANSWER',
      orderIndex: this.editFormService.formRes()?.questions.length ?? 0
    }
    const onlyQuestionAddUpdateReq: AnyOnlyQuestionAddUpdateReq =
      DefaultQuestionAddUpdateReq.get('SHORT_ANSWER')

    const question: AnyQuestionAddUpdateReq = {
      ...questionAddUpdateReq,
      ...structuredClone(onlyQuestionAddUpdateReq)
    }

    this.editFormService.addQuestion(question)
  }

}
