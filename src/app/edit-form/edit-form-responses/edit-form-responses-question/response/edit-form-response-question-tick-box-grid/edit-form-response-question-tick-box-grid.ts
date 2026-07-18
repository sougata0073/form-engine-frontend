import {Component, signal} from '@angular/core';
import {EditFormResponseQuestionComponent} from '../../../../../type/edit-form-response-question-component';
import {
  TickBoxGridResponseQuestionRes, TickBoxGridResponseQuestionResColumn
} from '../../../../../model/edit-form/responses/question/tick-box-grid-response-question-res';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatCheckbox} from '@angular/material/checkbox';
import {
  OnlyTickBoxGridColumnRes,
  OnlyTickBoxGridRowRes
} from '../../../../../model/edit-form/question/response/tick-box-grid-res';
import {
  EditFormResponsesQuestionBlankResponse
} from '../../../../../shared/edit-form-responses-question-blank-response/edit-form-responses-question-blank-response';
import {MatButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-edit-form-response-question-tick-box-grid',
  imports: [
    MatCard,
    MatCardContent,
    MatCheckbox,
    EditFormResponsesQuestionBlankResponse,
    MatButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ],
  templateUrl: './edit-form-response-question-tick-box-grid.html',
  styleUrl: './edit-form-response-question-tick-box-grid.scss',
})
export class EditFormResponseQuestionTickBoxGrid extends EditFormResponseQuestionComponent<TickBoxGridResponseQuestionRes> {

  protected rows = signal<OnlyTickBoxGridRowRes[]>([])
  protected columns = signal<OnlyTickBoxGridColumnRes[]>([])
  protected selectedRow = signal<OnlyTickBoxGridRowRes | null>(null)
  protected responsesBySelectedRow = signal<TickBoxGridResponseQuestionResColumn[]>([])

  override ngOnInit() {
    this.rows.set(
      this.response().rows
      .sort((a, b) => a.orderIndex - b.orderIndex)
    )
    this.columns.set(
      this.response().columns
      .sort((a, b) => a.orderIndex - b.orderIndex)
    )

    const firstRow = this.rows().at(0)

    if (firstRow) {
      this.selectRow(firstRow)
    }
  }

  protected selectRow(row: OnlyTickBoxGridRowRes) {
    this.selectedRow.set(row)

    this.responsesBySelectedRow.set(
      this.response().responses.find(r => r.rowId === row.id)?.responses ?? []
    )

    const totalResponseCount = +this.allResponseCountAndSummaries().totalResponseCount
    const nonBlankResponseCount = this.responsesBySelectedRow()
      .reduce((acc: any, res: any) => acc + (+res.responseCount), 0)

    this.blankResponseCount.set(totalResponseCount - nonBlankResponseCount)
    this.showQuestionLeftBlank.set(totalResponseCount > nonBlankResponseCount)

    const nonBlankResponseIds = new Set(
      this.responsesBySelectedRow().map(res => res.responseIds).flat()
    )
    this.blankResponseSummaries.set(
      this.allResponseCountAndSummaries().responses
        .filter(summary => !nonBlankResponseIds.has(summary.responseId))
    )
  }

  protected getColumnFromId(id: string) {
    return this.response().columns.find(col => col.id === id);
  }
}
