import {Component, inject, input, OnInit, signal} from '@angular/core';
import {EditFormHeader} from './edit-form-header/edit-form-header';
import {RouterOutlet} from '@angular/router';
import {EditFormService} from '../service/edit-form-service';
import {FormRes} from '../model/form/form-res';

@Component({
  selector: 'app-edit-form',
  imports: [
    EditFormHeader,
    RouterOutlet,
  ],
  templateUrl: './edit-form.html',
  styleUrl: './edit-form.scss',
})
export class EditForm implements OnInit{

  formId = input.required<string>()

  protected isFormLoaded = signal<boolean>(false)

  private editFormService = inject(EditFormService)

  ngOnInit() {
    this.editFormService.loadFormRes(this.formId(), () => {
      this.isFormLoaded.set(true)
    })
  }

}
