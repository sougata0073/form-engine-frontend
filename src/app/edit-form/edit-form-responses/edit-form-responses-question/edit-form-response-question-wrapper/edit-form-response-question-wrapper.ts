import {
  Component,
  ComponentRef,
  inject,
  input,
  OnChanges,
  OnInit,
  SimpleChanges,
  viewChild,
  ViewContainerRef
} from '@angular/core';
import {AnyResponseQuestionRes} from '../../../../type/any-response-question-res';
import {FormResponseQuestionComponentFactory} from '../../../../service/form-response-question-component-factory';
import {EditFormResponseService} from '../../../../service/edit-form-response-service';

@Component({
  selector: 'app-edit-form-response-question-wrapper',
  imports: [],
  templateUrl: './edit-form-response-question-wrapper.html',
  styleUrl: './edit-form-response-question-wrapper.scss',
})
export class EditFormResponseQuestionWrapper implements OnInit, OnChanges {

  formId = input.required<string>()
  response = input.required<AnyResponseQuestionRes>()

  private componentHost = viewChild('componentHost', {read: ViewContainerRef})

  private componentFactory = inject(FormResponseQuestionComponentFactory);
  private formResponseService = inject(EditFormResponseService)

  private createdComponentRef?: ComponentRef<unknown>

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const responseChange = changes['response']

    if (responseChange) {

      this.formResponseService.loadAllResponseCountAndSummaries(this.formId(), (res) => {

        this.createdComponentRef?.destroy()
        this.createdComponentRef = undefined

        this.componentFactory.getComponent(this.response().questionType).then(componentClass => {
          this.createdComponentRef = this.componentHost()?.createComponent(componentClass);

          this.createdComponentRef?.setInput('formId', this.formId());
          this.createdComponentRef?.setInput('response', this.response());
          this.createdComponentRef?.setInput('allResponseCountAndSummaries', res);
        })
      })
    }
  }

}
