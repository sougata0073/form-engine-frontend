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

  protected formInfo = this.editFormService.formInfo

  protected onPublishClick() {
    const prevForm = this.formInfo()!

    this.editFormService.updateFormInfo(prevForm.id, {
      name: prevForm.name,
      title: prevForm.title,
      description: prevForm.description,
      acceptingResponse: true,
      notAcceptingResponseMessage: prevForm.notAcceptingResponseMessage,
      published: true,
      stopAcceptingResponseOn: null,
      stopAcceptingResponseAfterResponse: null
    }, () => {
      this.dialogRef.close()
    })
  }

}
