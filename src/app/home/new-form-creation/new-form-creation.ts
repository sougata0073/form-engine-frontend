import {Component, inject, input, OnInit, output, signal} from '@angular/core';
import {FormTemplate} from "../form-template/form-template";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatPrefix} from "@angular/material/input";
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatTooltip} from '@angular/material/tooltip';
import {EditFormQuestionService} from '../../service/edit-form-question-service';
import {Router} from '@angular/router';
import {TemplateSummaryRes} from '../../model/template/template-summary-res';
import {HomeService} from '../../service/home-service';

@Component({
  selector: 'app-new-form-creation',
  imports: [
    FormTemplate,
    MatButton,
    MatIcon,
    MatIconButton,
    MatPrefix,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ],
  templateUrl: './new-form-creation.html',
  styleUrl: './new-form-creation.scss',
})
export class NewFormCreation {

  private editFormService = inject(EditFormQuestionService)
  private homeService = inject(HomeService)
  private router = inject(Router)

  headerTitle = input.required<string>()
  showControlButtons = input.required<boolean>()
  showBlankFormCreation = input.required<boolean>()
  templates = input.required<TemplateSummaryRes[]>()
  isRecentlyUsedTemplates = input.required<boolean>()

  templateGalleryClick = output<void>()
  hideTemplateGalleryClick = output<void>()

  openFormClick = output<void>()

  onTemplateGalleryClick() {
    if (this.showControlButtons()) {
      this.templateGalleryClick.emit()
    }
  }

  onHideTemplateGalleryClick() {
    if (this.showControlButtons()) {
      this.hideTemplateGalleryClick.emit()
    }
  }

  createBlankForm() {
    this.openFormClick.emit()
    this.editFormService.createForm({
      name: 'Untitled form',
      title: '',
      description: '',
      notAcceptingResponseMessage: 'This form is no longer accepting responses.',
      published: false,
      acceptingResponse: false,
      stopAcceptingResponseOn: null,
      stopAcceptingResponseAfterResponse: null
    }, (res) => {
      this.router.navigate(['forms', res.id, 'edit', 'questions'])
    })
  }

  buildFormFromTemplate(templateId: string) {
    this.openFormClick.emit()
    this.homeService.buildFormFromTemplate(templateId).subscribe(res => {
      this.router.navigate(['forms', res.formId, 'edit', 'questions'])
    })
  }

}
