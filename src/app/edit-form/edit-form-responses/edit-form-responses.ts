import {Component, inject, input, OnInit, signal} from '@angular/core';
import {EditFormResponsesHeader} from './edit-form-responses-header/edit-form-responses-header';
import {EditFormResponsesQuestion} from './edit-form-responses-question/edit-form-responses-question';
import {EditFormResponsesIndividual} from './edit-form-responses-individual/edit-form-responses-individual';
import {EditFormResponsesSummary} from './edit-form-responses-summary/edit-form-responses-summary';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-edit-form-responses',
  imports: [
    EditFormResponsesHeader,
    RouterOutlet
  ],
  templateUrl: './edit-form-responses.html',
  styleUrl: './edit-form-responses.scss',
})
export class EditFormResponses implements OnInit {

  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)

  ngOnInit() {
    // this.router.navigate(['summary'], {relativeTo: this.activatedRoute})
  }

}
