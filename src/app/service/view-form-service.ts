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

  private formRes = signal<FormRes | null>(null)

  loadFormRes(
    formId: string,
    onComplete?: (res: FormRes) => void,
    onError?: (error: ViewFormErrorRes) => void
  ) {
    const prev = this.formRes()

    if (prev) {
      onComplete?.(prev)
      return
    }

    const url = `http://localhost:9092/api/v1/forms/${formId}/view`

    this.http.get<FormRes>(url, {observe: 'response'}).subscribe({
      next: res => {

        if (res.ok) {
          console.log(res.body)
          this.formRes.set(res.body)
        }

      },
      complete: () => {

        const form = this.formRes()
        if (form) {
          onComplete?.(form)
        }

      },
      error: (err: HttpErrorResponse) => {
        onError?.(err.error)
      }
    })
  }

  submitResponse(req: FormResponsePutReq, onComplete?: () => void, onError?: () => void) {

    const url = `http://localhost:9093/api/v1/response`

    this.http.post<FormResponsePutRes>(url, req).subscribe({
      next: res => {
        console.log(res)
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
