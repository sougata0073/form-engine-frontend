import {Component, inject} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatDivider} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {EditFormService} from '../../service/edit-form-service';

@Component({
  selector: 'app-publish-form-dialog',
  imports: [
    MatDialogTitle,
    MatDivider,
    MatIcon,
    MatButton,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './publish-form-dialog.html',
  styleUrl: './publish-form-dialog.scss',
})
export class PublishFormDialog {

  protected editFormService = inject(EditFormService)
  protected dialogRef = inject(MatDialogRef<PublishFormDialog>)

  protected formRes = this.editFormService.formRes

  protected onPublishClick() {
    const prevForm = this.formRes()!
    this.editFormService.updateForm({
      title: prevForm.title,
      description: prevForm.description,
      acceptingResponse: prevForm.acceptingResponse,
      notAcceptingResponseMessage: prevForm.notAcceptingResponseMessage,
      published: true,
      userId: '5ea482fe-de87-4e18-aff6-6aca03ec50f9',
      stopAcceptingResponseOn: prevForm.stopAcceptingResponseOn,
      stopAcceptingResponseAfterResponse: prevForm.stopAcceptingResponseAfterResponse
    }, () => {
      this.dialogRef.close()
    })
  }

}
