import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class BaererInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const iolAccessToken: string | null = localStorage.getItem('iol-access-token');

    if (iolAccessToken) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + iolAccessToken)
      });
    }

    return next.handle(request);
  }
}
