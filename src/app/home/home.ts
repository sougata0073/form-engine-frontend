import {Component, inject, OnInit, signal} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatTooltip} from '@angular/material/tooltip';
import {ReactiveFormsModule} from '@angular/forms';
import {MatPrefix} from '@angular/material/input';
import {RecentForm} from './recent-form/recent-form';
import {FormSummaryRes} from '../model/form/form-summary-res';
import {HomeHeader} from './home-header/home-header';
import {NewFormCreation} from './new-form-creation/new-form-creation';
import {HomeService} from '../service/home-service';
import {TemplateSummaryRes} from '../model/template/template-summary-res';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  imports: [
    MatButton,
    MatIcon,
    MatIconButton,
    MatTooltip,
    ReactiveFormsModule,
    MatPrefix,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    RecentForm,
    HomeHeader,
    NewFormCreation,
    MatProgressSpinner
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {

  private homeService = inject(HomeService)

  protected templates = signal<{ headerTitle: string, templates: TemplateSummaryRes[] }[]>([])
  protected filterMenus = signal<{ title: string, isSelected: boolean }[]>([])
  protected filterMenuTitle = signal('')
  protected sortOptions = signal<{ title: string, isSelected: boolean }[]>([])

  protected recentForms = signal<FormSummaryRes[]>([])

  protected isTemplateGalleryOpened = signal<boolean>(false)

  protected showLoader = signal<boolean>(false)

  ngOnInit() {
    this.homeService.getTemplates().subscribe(res => {
      const uniqueCategoryNames = [...new Set(res.map(t => t.categoryName))]

      const templates = uniqueCategoryNames.map(categoryName => ({
        headerTitle: categoryName,
        templates: res.filter(t => t.categoryName === categoryName)
      }))

      this.templates.set(templates)
    })

    this.homeService.getRecentForms().subscribe(res => this.recentForms.set(res))

    this.filterMenus.set([
      {title: 'Owned by anyone', isSelected: true},
      {title: 'Owned by me', isSelected: false},
      {title: 'Not owned by me', isSelected: false},
    ])

    this.filterMenuTitle.set(this.filterMenus().find(m => m.isSelected)!.title)

    this.sortOptions.set([
      {title: 'Last opened by me', isSelected: true},
      {title: 'Last modified by me', isSelected: false},
      {title: 'Last modified', isSelected: false},
      {title: 'Title', isSelected: false},
    ])
  }

  onFilterMenuClick(title: string) {
    this.filterMenuTitle.set(title)
    this.filterMenus.update(menus =>
      menus.map(m => ({...m, isSelected: m.title === title}))
    )
  }

  onSortMenuClick(title: string) {
    this.sortOptions.update(menus =>
      menus.map(m => ({...m, isSelected: m.title === title}))
    )
  }
}
