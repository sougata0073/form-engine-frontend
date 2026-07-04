import {Component, inject, input, OnInit, output} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatInput} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {Clipboard} from '@angular/cdk/clipboard';
import {EditFormQuestionService} from '../../service/edit-form-question-service';
import {Router} from '@angular/router';
import {FormRes} from '../../model/form/form-res';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PublishFormDialog} from '../publish-form-dialog/publish-form-dialog';
import {MatDialog} from '@angular/material/dialog';
import {FormInfoRes} from '../../model/form/form-info-res';

@Component({
  selector: 'app-copy-responder-link-menu-content',
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './copy-responder-link-menu-content.html',
  styleUrl: './copy-responder-link-menu-content.scss',
})
export class CopyResponderLinkMenuContent implements OnInit {
  formInfo = input.required<FormInfoRes>()

  copy = output<void>()
  publish = output<void>()

  protected router = inject(Router)
  protected clipboard = inject(Clipboard)
  protected snackbar = inject(MatSnackBar)
  private dialog = inject(MatDialog)

  protected copyResponderLinkFormGroup = new FormGroup({
    link: new FormControl<string | null>({value: null, disabled: true})
  })

  ngOnInit() {
    this.copyResponderLinkFormGroup.controls.link.patchValue(this.getFullFormUrl())
  }

  protected onPublishClick() {
    this.dialog.open(PublishFormDialog, {
      data: this.formInfo
    })
  }

  protected onCopyClick() {
    this.clipboard.copy(this.getFullFormUrl())

    this.snackbar.open('Copied to clipboard', undefined, {
      horizontalPosition: 'start',
      verticalPosition: 'bottom'
    })._dismissAfter(2000)
  }

  private getFullFormUrl() {
    const relativeUrl = this.router.serializeUrl(
      this.router.createUrlTree(['forms', this.formInfo().id, 'view'])
    )
    return `${window.location.origin}${relativeUrl}`
  }
}
