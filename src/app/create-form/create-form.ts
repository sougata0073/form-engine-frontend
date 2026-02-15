import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EditFormService} from '../service/edit-form-service';

@Component({
  selector: 'app-create-form',
  imports: [],
  templateUrl: './create-form.html',
  styleUrl: './create-form.scss',
})
export class CreateForm implements OnInit {

  private editFormService = inject(EditFormService)
  private router = inject(Router)

  ngOnInit() {
    this.editFormService.createForm({
      title: 'Untitled form',
      description: 'Untitled form description',
      userId: crypto.randomUUID(),
      notAcceptingResponseMessage: 'This form is no longer accepting responses.',
      published: false,
      acceptingResponse: false,
      stopAcceptingResponseOn: null,
      stopAcceptingResponseAfterResponse: null
    }, res => {
      this.router.navigate(['forms', res.id, 'editFormService'])
    })
  }

}
