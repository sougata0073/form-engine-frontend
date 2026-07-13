import {Component, input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-edit-form-responses-question',
  imports: [],
  templateUrl: './edit-form-responses-question.html',
  styleUrl: './edit-form-responses-question.scss',
})
export class EditFormResponsesQuestion implements OnInit, OnChanges {

  questionId = input.required<string>({alias: 'q'})

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const questionIdChange = changes['questionId']
    if (questionIdChange) {

    }
  }

}
