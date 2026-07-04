import {Component, inject, input, OnInit, viewChild, ViewContainerRef} from '@angular/core';
import {FormResponseSummaryComponentFactory} from '../../../../service/form-response-summary-component-factory';
import {MatCard, MatCardContent} from '@angular/material/card';
import {QuestionType} from '../../../../type/question-type';

@Component({
  selector: 'app-edit-form-response-summary-wrapper',
  imports: [
    MatCard,
    MatCardContent
  ],
  templateUrl: './edit-form-response-summary-wrapper.html',
  styleUrl: './edit-form-response-summary-wrapper.scss',
})
export class EditFormResponseSummaryWrapper implements OnInit {

  questionType = input.required<QuestionType>()

  private componentHost = viewChild('componentHost', {read: ViewContainerRef})

  private componentFactory = inject(FormResponseSummaryComponentFactory);

  ngOnInit() {
    this.componentFactory.getComponent(this.questionType()).then(componentClass => {
      this.componentHost()?.createComponent(componentClass);
    })
  }

}
