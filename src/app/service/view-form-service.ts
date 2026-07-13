import {inject, Injectable, signal} from '@angular/core';
import {FormRes} from '../model/form/form-res';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ViewFormErrorRes} from '../model/form/view-form-error-res';
import {FormResponsePutReq} from '../model/form/form-response-put-req';
import {FormResponsePutRes} from '../model/form/form-response-put-res';

@Injectable({
  providedIn: 'root',
})
export class ViewFormService {

  private http = inject(HttpClient)

  private _formRes = signal<FormRes | null>(null)
  formRes = this._formRes.asReadonly()

  loadFormRes(
    formId: string,
    onComplete?: (res: FormRes) => void,
    onError?: (error: ViewFormErrorRes) => void
  ) {
    const prev = this._formRes()

    if (prev) {
      onComplete?.(prev)
      return
    }

    const url = `http://localhost:9092/api/v1/forms/${formId}/view`

    this.http.get<FormRes>(url, {observe: 'response'}).subscribe({
      next: res => {

        if (res.ok) {
          this._formRes.set(res.body)
        }

      },
      complete: () => {

        const form = this._formRes()
        if (form) {
          onComplete?.(form)
        }

      },
      error: (err: HttpErrorResponse) => {
        onError?.(err.error)
      }
    })
  }

  submitResponse(formId: string, req: FormResponsePutReq, onComplete?: () => void, onError?: () => void) {

    const url = `http://localhost:9093/api/v1/forms/${formId}/response`

    this.http.post<FormResponsePutRes>(url, req).subscribe({
      next: res => {

      },
      complete: () => {
        onComplete?.()
      },
      error: (err: HttpErrorResponse) => {
        onError?.()
      }
    })

  }
}
