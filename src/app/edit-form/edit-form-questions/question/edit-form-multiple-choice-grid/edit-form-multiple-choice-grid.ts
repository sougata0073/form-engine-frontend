import {Component, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {EditFormQuestionComponent} from '../../../../type/edit-form-question-component';
import {
  MultipleChoiceGridRes,
  OnlyMultipleChoiceGridRes
} from '../../../../model/edit-form/question/response/multiple-choice-grid-res';
import {EditFormStateService} from '../../../../service/edit-form-state-service';
import {EditFormDropdownOption} from '../edit-form-dropdown/edit-form-dropdown-option/edit-form-dropdown-option';
import {DropdownOption} from '../../../../type/dropdown-option';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {SimpleDialog} from '../../../../shared/simple-dialog/simple-dialog';
import {MatIcon} from '@angular/material/icon';
import {
  EditFormMultipleChoiceOption
} from '../edit-form-multiple-choice/edit-form-multiple-choice-option/edit-form-multiple-choice-option';
import {MultipleChoiceOption} from '../../../../type/multiple-choice-option';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {
  OnlyMultipleChoiceGridAddUpdateReq
} from '../../../../model/edit-form/question/request/multiple-choice-grid-add-update-req';

@Component({
  selector: 'app-edit-form-multiple-choice-grid',
  imports: [
    EditFormDropdownOption,
    MatButton,
    EditFormMultipleChoiceOption,
    MatRadioButton,
    MatRadioGroup,
  ],
  templateUrl: './edit-form-multiple-choice-grid.html',
  styleUrl: './edit-form-multiple-choice-grid.scss',
})
export class EditFormMultipleChoiceGrid extends EditFormQuestionComponent<MultipleChoiceGridRes, OnlyMultipleChoiceGridAddUpdateReq> implements OnInit {

  protected rows = signal<DropdownOption[]>([])
  protected columns = signal<MultipleChoiceOption[]>([])

  protected formStateService = inject(EditFormStateService)
  private dialog = inject(MatDialog)

  ngOnInit() {
    this.rows.update(() => {
      return this.question().rows.map((row, index) => {
        return {id: crypto.randomUUID(), orderNumber: index + 1, text: row, valid: !!row}
      })
    })
    this.columns.update(() => {
      return this.question().columns.map(col => {
        return {id: crypto.randomUUID(), text: col, valid: !!col}
      })
    })
  }

  override getOnlyQuestionAddUpdateReq(): OnlyMultipleChoiceGridAddUpdateReq {
    return {
      eachRowRequired: false,
      rows: this.rows().map(r => r.text),
      columns: this.columns().map(c => c.text)
    }
  }

  protected addRow() {
    if (this.rows().length >= 20) {
      this.dialog.open(
        SimpleDialog,
        SimpleDialog.configure('Error', 'Can not add more than 20 row', 'Close')
      )
      return
    }
    this.rows.update(val => [...val, {
      id: crypto.randomUUID(),
      orderNumber: val.length + 1,
      text: `Row ${val.length + 1}`,
      valid: true
    }])
    this.emiCanSaveHasError()
    this.updateQuestion.emit(this.getOnlyQuestionAddUpdateReq())
  }

  protected removeRow(rowId: string) {
    this.rows.update(val => {
        const newArray = val
          .filter(v => v.id !== rowId)
          .map((v, index) => {
            return {...v, orderNumber: index + 1}
          })

        return [...newArray]
      }
    )
    this.emiCanSaveHasError()
    this.updateQuestion.emit(this.getOnlyQuestionAddUpdateReq())
  }

  protected onRowTextChange(row: DropdownOption) {
    this.rows.update(val =>
      val.map(v => v.id === row.id ? {...v, text: row.text} : v))
    this.updateQuestion.emit(this.getOnlyQuestionAddUpdateReq())
  }

  protected onRowCanSaveChange(rowId: string, canSave: boolean) {
    this.rows.update(ops => {
      return ops.map(op => {
        return op.id === rowId ? {...op, valid: canSave} : {...op}
      })
    })
    this.emiCanSaveHasError()
  }

  protected addColumn() {
    if (this.columns().length >= 20) {
      this.dialog.open(
        SimpleDialog,
        SimpleDialog.configure(
          'Error',
          'Can not add more than 20 columns',
          'Close'
        )
      )
      return
    }
    this.columns.update(val => {
      const option = {id: crypto.randomUUID(), text: `Column ${val.length + 1}`, valid: true}
      return [...val, option]
    })
    this.emiCanSaveHasError()
    this.updateQuestion.emit(this.getOnlyQuestionAddUpdateReq())
  }

  protected removeColumn(columnId: string) {
    this.columns.update(val => {
      return [...val.filter(v => v.id !== columnId)]
    })
    this.emiCanSaveHasError()
    this.updateQuestion.emit(this.getOnlyQuestionAddUpdateReq())
  }

  protected onColumnTextChange(column: MultipleChoiceOption) {
    this.columns.update(val => {
      return val.map(v => v.id === column.id ? {...v, text: column.text} : v)
    })
    this.updateQuestion.emit(this.getOnlyQuestionAddUpdateReq())
  }

  protected onColumnCanSaveChange(columnId: string, canSave: boolean) {
    this.columns.update(ops => {
      return ops.map(op => {
        return op.id === columnId ? {...op, valid: canSave} : {...op}
      })
    })
    this.emiCanSaveHasError()
  }

  protected emiCanSaveHasError() {
    const allRowsValid = this.rows().every(r => r.valid)
    const allColumnsValid = this.columns().every(c => c.valid)

    this.canSaveQuestion.emit(
      allRowsValid && allColumnsValid && !!this.rows().length && !!this.columns().length
    )
    this.hasError.emit(!allRowsValid || !allColumnsValid)
  }
}
