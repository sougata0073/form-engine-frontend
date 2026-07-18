import {Component, inject, input, OnDestroy, OnInit, output, signal, viewChild} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {MatFormField} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {EditFormResponseService} from '../../../service/edit-form-response-service';
import {filter} from 'rxjs';
import {EditFormResponsesSummary} from '../edit-form-responses-summary/edit-form-responses-summary';
import {FormResponseSummary} from '../../../model/form/form-response-summary';

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
export class EditFormResponsesHeader implements OnInit {

  formId = input.required<string>()
  formSummary = input.required<FormResponseSummary | null>()

  protected tabs = signal<{ label: string, link: TabLink }[]>([])
  protected activatedLink = signal<TabLink>('summary')

  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  protected formResponseService = inject(EditFormResponseService)

  protected questionSummaries = this.formResponseService.questionSummaries

  protected questionPaginatorPageIndex = signal<number>(0)

  protected formGroup = new FormGroup({
    questionSelector: new FormControl<string>('', [Validators.required])
  })

  ngOnInit() {
    this.tabs.set([
      {label: 'Summary', link: 'summary'},
      {label: 'Question', link: 'question'},
      {label: 'Individual', link: 'individual'}
    ])

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const activatedSection = this.router.url.split(/[/?]/)
          .find(s => this.tabs().map(t => t.link).includes(s as TabLink))

        this.activatedLink.set(activatedSection as TabLink)
        this.onActivatedLinkChange()
      });

    const activatedSection = this.router.url.split(/[/?]/)
      .find(s => this.tabs().map(t => t.link).includes(s as TabLink))

    this.activatedLink.set(activatedSection as TabLink)
    this.onActivatedLinkChange()

    this.formGroup.controls.questionSelector.valueChanges.subscribe(val => {
      const index = this.questionSummaries()?.questions.findIndex(q => q.id === val)
      if (index !== undefined) {
        this.questionPaginatorPageIndex.set(index)
      }

      if (val) {
        this.router.navigate(['question'], {
          relativeTo: this.activatedRoute,
          queryParams: {q: val}
        })
      }
    })
  }

  protected onTabClick(link: TabLink) {
    if (this.activatedLink() !== link) {
      this.router.navigate([link], {relativeTo: this.activatedRoute})
      this.activatedLink.set(link)
      this.onActivatedLinkChange()
    }
  }

  protected handleQuestionPaginatorPageEvent(e: PageEvent) {
    const question = this.questionSummaries()?.questions.at(e.pageIndex)

    if (question) {
      this.formGroup.controls.questionSelector.setValue(question.id)
    }
  }

  private onActivatedLinkChange() {
    switch (this.activatedLink()) {
      case "question": {

        this.formResponseService.loadQuestionSummaries(this.formId(), res => {
          const responsesByQuestionQId = this.activatedRoute.snapshot.queryParams['q']

          if (responsesByQuestionQId) {
            const question = res.questions.find(q => q.id === responsesByQuestionQId)
            if (question) {
              this.formGroup.controls.questionSelector.setValue(question.id)
            }
          } else {
            const first = res.questions.at(0)
            if (first) {
              this.formGroup.controls.questionSelector.setValue(first.id)
            }
          }
        })

        break
      }
      case "individual": {
      }
    }
  }

}
