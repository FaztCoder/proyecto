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

    // const token: string = this.cookieService.get('token');
    // let req = request;

    // if (token) {
    //   req = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   });
    // }
    // return next.handle(req);

     try{
         const token = this.cookieService.get('token');
        let newRequest = request
        newRequest = request.clone({
        
          setHeaders: {
            Authorization: `Bearer ${token}`,
          }
        })
     
        return next.handle(newRequest);
    }catch(e){
     console.log('errorrrrrr',e);
      return next.handle(request);
    }
    
  }
}
