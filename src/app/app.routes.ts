import {Routes} from '@angular/router';
import {EditForm} from './edit-form/edit-form';
import {EditFormQuestions} from './edit-form/edit-form-questions/edit-form-questions';
import {EditFormResponses} from './edit-form/edit-form-responses/edit-form-responses';
import {EditFormSettings} from './edit-form/edit-form-settings/edit-form-settings';
import {ViewForm} from './view-form/view-form';
import {CreateForm} from './create-form/create-form';
import {PreviewForm} from './preview-form/preview-form';

export const routes: Routes = [
  {
    path: 'forms',
    children: [
      {
        path: 'create',
        component: CreateForm
      },
      {
        path: ':formId',
        children: [
          {
            path: 'edit',
            component: EditForm,
            children: [
              {
                path: 'questions',
                component: EditFormQuestions
              },
              {
                path: 'responses',
                component: EditFormResponses
              },
              {
                path: 'settings',
                component: EditFormSettings
              }
            ]
          },
          {
            path: 'view',
            component: ViewForm
          },
          {
            path: 'preview',
            component: PreviewForm
          }
        ]
      }
    ]
  }
];
