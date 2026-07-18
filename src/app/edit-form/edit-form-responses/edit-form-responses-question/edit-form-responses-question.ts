import {Component, inject, input, OnChanges, OnInit, signal, SimpleChanges} from '@angular/core';
import {EditFormResponseService} from '../../../service/edit-form-response-service';
import {ActivatedRoute} from '@angular/router';
import {
  EditFormResponseQuestionWrapper
} from './edit-form-response-question-wrapper/edit-form-response-question-wrapper';

@Component({
  selector: 'app-edit-form-responses-question',
  imports: [
    EditFormResponseQuestionWrapper,
  ],
  templateUrl: './edit-form-responses-question.html',
  styleUrl: './edit-form-responses-question.scss',
})
export class EditFormResponsesQuestion implements OnInit, OnChanges {

  questionId = input.required<string>({alias: 'q'})

  formId = signal<string | null>(null)

  private formResponseService = inject(EditFormResponseService)
  private activatedRoute = inject(ActivatedRoute)

  protected responseByQuestion = this.formResponseService.responseByQuestion

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const questionIdChange = changes['questionId']
    if (questionIdChange.currentValue) {
      const questionId = questionIdChange.currentValue
      const formId = this.formId()

      if (formId) {
        this.formResponseService.loadResponseByQuestion(formId, questionId, (res) => {
          // console.log(res)
        })
      } else {
        this.activatedRoute.parent!.parent!.paramMap.subscribe(params => {
          this.formId.set(params.get('formId')!);

          this.formResponseService.loadResponseByQuestion(this.formId()!, questionId, (res) => {
            // console.log(res)
          })
        })
      }
    }
  }

}
