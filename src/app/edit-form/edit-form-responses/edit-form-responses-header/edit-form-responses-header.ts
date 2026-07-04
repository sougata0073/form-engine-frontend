import {Component, effect, inject, OnDestroy, OnInit, output, signal} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {ActivatedRoute, Router} from '@angular/router';
import {MatFormField} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {EditFormResponseService} from '../../../service/edit-form-response-service';
import {FormResponseSummary} from '../../../model/form/form-response-summary';
import {QuestionSummariesRes} from '../../../model/question/question-summaries-res';
import {QuestionSummary} from '../../../model/question/question-summary';

type TabLink = 'summary' | 'question' | 'individual'

@Component({
  selector: 'app-edit-form-responses-header',
  imports: [
    MatCard,
    MatCardContent,
    MatIcon,
    MatIconButton,
    MatTooltip,
    MatTabLink,
    MatTabNav,
    MatTabNavPanel,
    MatFormField,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatPaginator
  ],
  templateUrl: './edit-form-responses-header.html',
  styleUrl: './edit-form-responses-header.scss',
})
export class EditFormResponsesHeader implements OnInit, OnDestroy {

  activeQuestionSummary = output<QuestionSummary>()

  formId = signal<string>('')

  protected tabs = signal<{ label: string, link: TabLink }[]>([])
  protected activatedLink = signal<TabLink>('summary')

  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  protected formResponseService = inject(EditFormResponseService)

  protected formSummary = signal<FormResponseSummary | null>(null)
  protected questionSummaries = signal<QuestionSummariesRes | null>(null)

  protected formGroup = new FormGroup({
    questionSelector: new FormControl<string>('', [Validators.required])
  })

  private activatedLinkEffect = effect(() => {
    switch (this.activatedLink()) {
      case "question": {

        this.formResponseService.loadQuestionSummaries(this.formId(), res => {
          this.questionSummaries.set(res)

          const first = res.questions.at(0)

          if (first) {
            this.formGroup.controls.questionSelector.setValue(first.id)
          }
        })

        break
      }
      case "individual": {
      }
    }
  })

  ngOnInit() {
    this.tabs.set([
      {label: 'Summary', link: 'summary'},
      {label: 'Question', link: 'question'},
      {label: 'Individual', link: 'individual'}
    ])

    this.activatedRoute.parent!.paramMap.subscribe(params => {
      this.formId.set(params.get('formId')!);

      this.formResponseService.loadFormResponseSummary(this.formId(), res => {
        this.formSummary.set(res)
      })
    })

    const activatedSection = this.router.url.split('/')
      .find(s => this.tabs().map(t => t.link).includes(s as TabLink))

    this.activatedLink.set(activatedSection as TabLink)
  }

  ngOnDestroy() {
    this.activatedLinkEffect.destroy()
  }

  protected onTabClick(link: TabLink) {
    this.router.navigate([link], {relativeTo: this.activatedRoute})
    this.activatedLink.set(link)
  }

}
