import {ChangeDetectionStrategy, Component, computed, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {QuestionCard} from '../../../shared/question-card/question-card';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {EditFormStateService} from '../../../service/edit-form-state-service';
import {FocusableComponent} from '../../../type/focusable-component';
import {EditFormService} from '../../../service/edit-form-service';

@Component({
  selector: 'app-edit-form-info',
  imports: [
    QuestionCard,
    ReactiveFormsModule,
    MatInput,
    MatFormField,
    MatLabel
  ],
  templateUrl: './edit-form-info.html',
  styleUrl: './edit-form-info.scss',
})
export class EditFormInfo implements OnInit, FocusableComponent {

  componentId = signal(crypto.randomUUID())

  protected editFormService = inject(EditFormService)
  protected formStateService = inject(EditFormStateService)

  protected formRes = computed(() => {
    return this.editFormService.formRes()!
  })

  protected formGroup = new FormGroup({
    title: new FormControl<string | null>('', [Validators.required]),
    description: new FormControl<string | null>('', [Validators.required])
  })

  ngOnInit() {
    this.formGroup.patchValue({
      title: this.formRes().title,
      description: this.formRes().description
    })

    this.formGroup.valueChanges.subscribe(val => {
      if (this.formGroup.invalid) return

      this.editFormService.updateForm({
        title: val.title!,
        description: val.description!,
        acceptingResponse: this.formRes().acceptingResponse,
        notAcceptingResponseMessage: this.formRes().notAcceptingResponseMessage,
        published: this.formRes().published,
        stopAcceptingResponseAfterResponse: this.formRes().stopAcceptingResponseAfterResponse,
        stopAcceptingResponseOn: this.formRes().stopAcceptingResponseOn,
        userId: '5ea482fe-de87-4e18-aff6-6aca03ec50f9'
      })
    })
  }

}
