import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';

export class HttpInterceptors {

  static baseUrlInterceptor(baseUrl: string): HttpInterceptorFn {
    return (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
      const newReq = req.clone({
        url: baseUrl + req.url
      })

      return next(newReq)
    }
  }

}
