import {inject, Injectable, signal} from '@angular/core';
import {FormRes} from '../model/form/form-res';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ViewFormErrorRes} from '../model/form/view-form-error-res';

@Injectable({
  providedIn: 'root',
})
export class ViewFormService {

  private http = inject(HttpClient)

  private _formRes = signal<FormRes | null>(null)
  formRes = this._formRes.asReadonly()

  loadFormRes(
    formId: string,
    onComplete?: () => void,
    onError?: (error: ViewFormErrorRes) => void
  ) {
    if (this._formRes()) {
      onComplete?.()
      return
    }

    const url = `http://localhost:9092/api/v1/forms/${formId}/view`
    this.http.get<FormRes>(url, {observe: 'response'}).subscribe({
      next: res => {
        if (res.ok) {
          console.log(res.body)
          this._formRes.set(res.body)
        }
      },
      complete: () => onComplete?.(),
      error: (err: HttpErrorResponse) => {
        onError?.(err.error)
      }
    })
  }
}
