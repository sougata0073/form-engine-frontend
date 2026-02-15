import {QuestionRes} from '../model/edit-form/question/response/question-res';
import {Directive, inject, input, output} from '@angular/core';
import {EditFormService} from '../service/edit-form-service';
import {ObjectUtil} from '../util/object-util';
import {AnyOnlyQuestionAddUpdateReq} from './any-only-question-add-update-req';

@Directive()
export abstract class EditFormQuestionComponent<Q extends QuestionRes, OnlyQuestionAddUpdateReq> {

  question = input.required<Q>();
  parentComponentId = input.required<string>()
  moreMenuItemIds = input<Set<string>>(new Set());

  moreMenuItemId = output<string>()
  canSaveQuestion = output<boolean>()
  hasError = output<boolean>()
  updateQuestion = output<AnyOnlyQuestionAddUpdateReq>()

  abstract getOnlyQuestionAddUpdateReq(): OnlyQuestionAddUpdateReq
}
