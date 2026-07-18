import {Component, inject, input, OnInit, signal} from '@angular/core';
import {EditFormResponsesHeader} from './edit-form-responses-header/edit-form-responses-header';
import {EditFormResponsesQuestion} from './edit-form-responses-question/edit-form-responses-question';
import {EditFormResponsesIndividual} from './edit-form-responses-individual/edit-form-responses-individual';
import {EditFormResponsesSummary} from './edit-form-responses-summary/edit-form-responses-summary';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {EditFormResponseService} from '../../service/edit-form-response-service';
import {MatCard, MatCardContent} from '@angular/material/card';
import {filter} from 'rxjs';

@Component({
  selector: 'app-edit-form-responses',
  imports: [
    EditFormResponsesHeader,
    RouterOutlet,
    MatCard,
    MatCardContent
  ],
  templateUrl: './edit-form-responses.html',
  styleUrl: './edit-form-responses.scss',
})
export class EditFormResponses implements OnInit {

  formId = signal<string>('')

  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  protected formResponseService = inject(EditFormResponseService)

  protected formSummary = this.formResponseService.formResponseSummary

  ngOnInit() {
    this.activatedRoute.parent!.paramMap.subscribe(params => {
      this.formId.set(params.get('formId')!);

      this.formResponseService.loadFormResponseSummary(this.formId(), res => {
      })
    })
  }

}
