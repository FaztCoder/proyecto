import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private cookieService: CookieService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // return next.handle(request);

    const toke: string = this.cookieService.get('access_token');
    let req = request;

    if (toke) {
      req = request.clone({
        setHeaders: {
          Authorization: `Bearer ${toke}`
        }
      });
    }
    return next.handle(req);
  }
}
