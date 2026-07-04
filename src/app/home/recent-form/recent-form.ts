import {Component, inject, Inject, input, LOCALE_ID, OnInit, output, signal} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {FormSummaryRes} from '../../model/form/form-summary-res';
import {formatDate} from '@angular/common';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {InputDialog} from '../../shared/input-dialog/input-dialog';
import {FunctionalDialog} from '../../shared/functional-dialog/functional-dialog';
import {HomeService} from '../../service/home-service';
import {form} from '@angular/forms/signals';

@Component({
  selector: 'app-recent-form',
  imports: [
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ],
  templateUrl: './recent-form.html',
  styleUrl: './recent-form.scss',
})
export class RecentForm implements OnInit {

  form = input.required<FormSummaryRes>()

  showLoader = output<boolean>()

  protected formattedDate = signal('')

  private homeService = inject(HomeService)
  private router = inject(Router)
  private dialog = inject(MatDialog);

  constructor(@Inject(LOCALE_ID) private locale: string) {
  }

  ngOnInit() {
    const formLastOpenedDate = new Date(this.form().lastOpenedOn)
    const today = new Date();

    const isToday =
      formLastOpenedDate.getFullYear() === today.getFullYear() &&
      formLastOpenedDate.getMonth() === today.getMonth() &&
      formLastOpenedDate.getDate() === today.getDate();

    if (isToday) {
      this.formattedDate.set(formatDate(formLastOpenedDate, 'HH:mm', this.locale))
    } else {
      this.formattedDate.set(formatDate(formLastOpenedDate, 'd MMM y', this.locale))
    }
  }

  openForm() {
    this.router.navigate(['forms', this.form().id, 'edit', 'questions'])
  }

  protected openRenameDialog() {
    const dialogRef = this.dialog.open(InputDialog, {
      data: InputDialog.configure(
        'Rename',
        'Please enter a new name for the item:',
        this.form().name,
        'Cancel',
        () => dialogRef.close(),
        'OK',
        () => {
          dialogRef.close()
        }
      )
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.showLoader.emit(true);
        this.homeService.renameForm(this.form().id, {newName: result}).subscribe(res => {
          this.form().name = result
          this.showLoader.emit(false);
        })
      }
    });

  }
}
