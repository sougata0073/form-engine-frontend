import {
  Component, ElementRef,
  inject, input,
  OnInit,
  signal, viewChild,
  ViewEncapsulation
} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {ActivatedRoute, Router} from '@angular/router';
import {MatCard, MatCardContent} from '@angular/material/card';
import {EditFormService} from '../../service/edit-form-service';
import {Clipboard} from '@angular/cdk/clipboard';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {ReactiveFormsModule} from '@angular/forms';
import {PublishFormDialog} from '../../shared/publish-form-dialog/publish-form-dialog';
import {
  CopyResponderLinkMenuContent
} from '../../shared/copy-responder-link-menu-content/copy-responder-link-menu-content';
import {PublishedOptionsDialog} from '../../shared/published-options-dialog/published-options-dialog';
import {FunctionalDialog} from '../../shared/functional-dialog/functional-dialog';

type TabLink = 'questions' | 'responses' | 'settings'

@Component({
  selector: 'app-edit-form-header',
  imports: [
    NgOptimizedImage,
    MatIcon,
    MatIconButton,
    MatTooltip,
    MatButton,
    MatTabNav,
    MatTabLink,
    MatTabNavPanel,
    MatCard,
    MatCardContent,
    MatMenu,
    MatMenuTrigger,
    ReactiveFormsModule,
    CopyResponderLinkMenuContent,
    MatMenuItem
  ],
  templateUrl: './edit-form-header.html',
  styleUrl: './edit-form-header.scss',
})
export class EditFormHeader implements OnInit {

  copyResponderLinkButton = viewChild('copyResponderLinkButton');

  protected tabs = signal<{ label: string, link: TabLink }[]>([])
  protected activatedLink = signal<TabLink>('questions')

  private editFormService = inject(EditFormService)
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private dialog = inject(MatDialog)

  protected formRes = this.editFormService.formRes

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(val => {
      if (val['publishedOptions'] && this.formRes()!.published) {
        this.openPublishedOptionsDialog()
      }
    })

    this.tabs.set([
      {label: 'Questions', link: 'questions'},
      {label: 'Responses', link: 'responses'},
      {label: 'Settings', link: 'settings'}
    ])
    this.router.navigate(
      [this.activatedLink()], {relativeTo: this.activatedRoute}
    )
  }

  protected onTabClick(link: TabLink) {
    this.router.navigate([link], {relativeTo: this.activatedRoute})
    this.activatedLink.set(link)
  }

  protected onPreviewClick() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['forms', this.formRes()!.id, 'preview'])
    )

    window.open(url, '_blank')
  }

  protected onPublishClick() {
    this.dialog.open(PublishFormDialog).afterClosed().subscribe(() => {
      (this.copyResponderLinkButton() as unknown as MatIconButton)._elementRef.nativeElement.click()
    })
  }

  protected openPublishedOptionsDialog() {
    this.dialog.open(PublishedOptionsDialog)
  }

  protected onUnpublishFormClick() {
    if (!this.formRes()!.published) return

    const dialogRef = this.dialog.open(FunctionalDialog, {
      data: FunctionalDialog.configure(
        'Unpublish form',
        'The form will no longer be visible to responders. Responders will see a blank page if they open the form link. Form editors can still make changes and publish the form again.',
        'Cancel',
        () => dialogRef.close(),
        'Unpublish',
        () => {
          const prevForm = this.formRes()!
          this.editFormService.updateForm({
            acceptingResponse: prevForm.acceptingResponse,
            description: prevForm.description,
            notAcceptingResponseMessage: prevForm.notAcceptingResponseMessage,
            published: false,
            stopAcceptingResponseAfterResponse: prevForm.stopAcceptingResponseAfterResponse,
            stopAcceptingResponseOn: prevForm.stopAcceptingResponseOn,
            title: prevForm.title,
            userId: '5ea482fe-de87-4e18-aff6-6aca03ec50f9'
          }, () => dialogRef.close())
        }
      )
    })
  }
}
