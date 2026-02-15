import {Component, inject, input, OnInit, output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatInput} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatMenu} from '@angular/material/menu';
import {Clipboard} from '@angular/cdk/clipboard';
import {EditFormService} from '../../service/edit-form-service';
import {Router} from '@angular/router';
import {FormRes} from '../../model/form/form-res';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  formRes = input.required<FormRes>()

  copy = output<void>()
  publish = output<void>()

  protected router = inject(Router)
  protected clipboard = inject(Clipboard)
  protected snackbar = inject(MatSnackBar)

  protected copyResponderLinkFormGroup = new FormGroup({
    link: new FormControl<string | null>({value: null, disabled: true})
  })

  ngOnInit() {
    this.copyResponderLinkFormGroup.controls.link.patchValue(this.getFullFormUrl())
  }

  protected onCopyClick() {
    this.clipboard.copy(this.getFullFormUrl())

    this.snackbar.open('Copied to clipboard', undefined, {
      horizontalPosition: 'start',
      verticalPosition: 'bottom'
    })._dismissAfter(2000)

    this.copy.emit()
  }

  private getFullFormUrl() {
    const relativeUrl = this.router.serializeUrl(
      this.router.createUrlTree(['forms', this.formRes().id, 'view'])
    )
    return `${window.location.origin}${relativeUrl}`
  }
}
