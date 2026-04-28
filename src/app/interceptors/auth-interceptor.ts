import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const reqWithHeader = req.clone({
      headers: new HttpHeaders({
        'authorization': 'MY-TOKEN',
      })
    });
    return next.handle(reqWithHeader);
  }
}