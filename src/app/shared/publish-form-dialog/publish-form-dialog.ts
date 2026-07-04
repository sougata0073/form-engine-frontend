import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatDivider} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {EditFormQuestionService} from '../../service/edit-form-question-service';
import {FormInfoRes} from '../../model/form/form-info-res';

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

  protected editFormService = inject(EditFormQuestionService)
  protected dialogRef = inject(MatDialogRef<PublishFormDialog>)

  protected formInfo = inject<FormInfoRes>(MAT_DIALOG_DATA)

  protected onPublishClick() {
    const prevForm = this.formInfo

    this.editFormService.updateFormInfo({
      name: prevForm.name,
      title: prevForm.title,
      description: prevForm.description,
      acceptingResponse: prevForm.acceptingResponse,
      notAcceptingResponseMessage: prevForm.notAcceptingResponseMessage,
      published: true,
      stopAcceptingResponseOn: new Date(prevForm.stopAcceptingResponseOn),
      stopAcceptingResponseAfterResponse: prevForm.stopAcceptingResponseAfterResponse
    }, (res) => {
      this.dialogRef.close(res)
    })
  }

}
