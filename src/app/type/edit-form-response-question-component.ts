import {Directive, inject, input, OnInit, signal} from '@angular/core';
import {ResponseQuestion} from '../model/edit-form/responses/question/response-question';
import {
  AllResponseCountAndIds,
  FormResponseSummary
} from '../model/edit-form/responses/question/all-response-count-and-ids';
import {ActivatedRoute, Router} from '@angular/router';

@Directive()
export class EditFormResponseQuestionComponent<R extends ResponseQuestion<any>> implements OnInit {

  formId = input.required<string>()
  response = input.required<R>();
  allResponseCountAndSummaries = input.required<AllResponseCountAndIds>()

  protected router = inject(Router)
  protected activatedRoute = inject(ActivatedRoute)

  protected showQuestionLeftBlank = signal<boolean>(false)
  protected blankResponseCount = signal<number>(0)
  protected blankResponseSummaries = signal<FormResponseSummary[]>([])

  ngOnInit() {
    const totalResponseCount = +this.allResponseCountAndSummaries().totalResponseCount
    const nonBlankResponseCount = this.response().responses
      .reduce((acc: any, res: any) => acc + (+res.responseCount), 0)

    this.blankResponseCount.set(totalResponseCount - nonBlankResponseCount)
    this.showQuestionLeftBlank.set(totalResponseCount > nonBlankResponseCount)

    const nonBlankResponseIds = new Set(this.response().responses.map(res => res.responseIds).flat())
    this.blankResponseSummaries.set(
      this.allResponseCountAndSummaries().responses
        .filter(summary => !nonBlankResponseIds.has(summary.responseId))
    )
  }

  onResponseIdClick(id: string) {
    this.router.navigate(['forms', this.formId(), 'edit', 'responses', 'individual'], {queryParams: {r: id}})
  }

  getFormResponseSummaryFromFormResponseId(id: string) {
    return this.allResponseCountAndSummaries().responses.find(res => res.responseId === id)
  }
}
