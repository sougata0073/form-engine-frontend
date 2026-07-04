import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormSummaryRes} from '../model/form/form-summary-res';
import {FormTemplate} from '../home/form-template/form-template';
import {TemplateSummaryRes} from '../model/template/template-summary-res';
import {TemplateToFormBuildRes} from '../model/template/template-to-form-build-res';
import {FormRenameReq} from '../model/form/form-rename-req';
import {SuccessMessage} from '../model/common/success-message';

@Injectable({
  providedIn: 'root',
})
export class HomeService {

  private http = inject(HttpClient)

  getRecentForms() {
    const url = 'http://localhost:9092/api/v1/forms/recent'

    return this.http.get<FormSummaryRes[]>(url)
  }

  getTemplates() {
    const url = 'http://localhost:9092/api/v1/templates'

    return this.http.get<TemplateSummaryRes[]>(url)
  }

  buildFormFromTemplate(templateId: string) {
    const url = `http://localhost:9092/api/v1/templates/${templateId}/build-form`

    return this.http.post<TemplateToFormBuildRes>(url, {})
  }

  renameForm(formId: string, req: FormRenameReq) {
    const url = `http://localhost:9092/api/v1/forms/${formId}/rename`

    return this.http.patch<SuccessMessage>(url, req)
  }

}
