import {Component, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {EditFormQuestionComponent} from '../../../../type/edit-form-question-component';
import {MultipleChoiceRes, OnlyMultipleChoiceRes} from '../../../../model/edit-form/question/response/multiple-choice-res';
import {MatButton} from '@angular/material/button';
import {EditFormMultipleChoiceOption} from './edit-form-multiple-choice-option/edit-form-multiple-choice-option';
import {EditFormStateService} from '../../../../service/edit-form-state-service';
import {MatDialog} from '@angular/material/dialog';
import {SimpleDialog} from '../../../../shared/simple-dialog/simple-dialog';
import {MultipleChoiceOption} from '../../../../type/multiple-choice-option';
import {OnlyMultipleChoiceAddUpdateReq} from '../../../../model/edit-form/question/request/multiple-choice-add-update-req';

@Component({
  selector: 'app-edit-form-multiple-choice',
  imports: [
    MatButton,
    EditFormMultipleChoiceOption
  ],
  templateUrl: './edit-form-multiple-choice.html',
  styleUrl: './edit-form-multiple-choice.scss',
})
export class EditFormMultipleChoice extends EditFormQuestionComponent<MultipleChoiceRes, OnlyMultipleChoiceAddUpdateReq> implements OnInit {

  protected options = signal<MultipleChoiceOption[]>([])

  protected formStateService = inject(EditFormStateService)
  private dialog = inject(MatDialog)

  ngOnInit() {
    this.options.update(() => {
      return this.question().options.map((op) => {
        return {id: crypto.randomUUID(), text: op, valid: !!op}
      })
    })
  }

  override getOnlyQuestionAddUpdateReq(): OnlyMultipleChoiceAddUpdateReq {
    return {
      options: this.options().map(val => val.text)
    }
  }

  protected onAddOptionClick() {
    if (this.options().length >= 20) {
      this.dialog.open(
        SimpleDialog,
        SimpleDialog.configure('Error', 'Can not add more than 20 options', 'Close')
      )
      return
    }
    this.options.update(val => {
      const option = {id: crypto.randomUUID(), text: `Option ${val.length + 1}`, valid: true}
      return [...val, option]
    })

    this.emitCanSaveHasError()
    this.updateQuestion.emit(this.getOnlyQuestionAddUpdateReq())
  }

  protected removeOption(optionId: string) {
    this.options.update(val => {
      return [...val.filter(v => v.id !== optionId)]
    })

    this.emitCanSaveHasError()
    this.updateQuestion.emit(this.getOnlyQuestionAddUpdateReq())
  }

  protected onOptionTextChange(option: MultipleChoiceOption) {
    this.options.update(val =>
      val.map(v => v.id === option.id ? {...v, text: option.text} : v))

    this.updateQuestion.emit(this.getOnlyQuestionAddUpdateReq())
  }

  protected onOptionCanSaveChange(optionId: string, canSave: boolean) {
    this.options.update(ops => {
      return ops.map(op => {
        return op.id === optionId ? {...op, valid: canSave} : {...op}
      })
    })
    this.emitCanSaveHasError()
  }

  protected emitCanSaveHasError() {
    const allValid = this.options().every(op => op.valid)
    this.canSaveQuestion.emit(allValid)
    this.hasError.emit(!allValid)
  }

}
