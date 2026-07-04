import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  ElementRef,
  inject,
  input,
  OnInit,
  signal,
  ViewChild
} from '@angular/core';
import {EditFormHeader} from './edit-form-header/edit-form-header';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {EditFormQuestionService} from '../service/edit-form-question-service';
import {FormRes} from '../model/form/form-res';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {EditFormStateService} from '../service/edit-form-state-service';
import html2canvas from 'html2canvas';
import {EditFormResponseService} from '../service/edit-form-response-service';

@Component({
  selector: 'app-edit-form',
  imports: [
    EditFormHeader,
    RouterOutlet,
    MatProgressSpinner,
  ],
  templateUrl: './edit-form.html',
  styleUrl: './edit-form.scss',
})
export class EditForm implements OnInit {

  formId = input.required<string>()

  protected editFormStateService = inject(EditFormStateService)

  ngOnInit() {

  }

}
