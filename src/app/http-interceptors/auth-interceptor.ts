import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var token: string = this.getToken();

    // this.httpHeaders = this.httpHeaders.set('Authorization', 'Bearer ' + token);

    const cloned_req = req.clone({
      headers: this.httpHeaders,
      withCredentials: true,
    });
    console.log(req.headers);
    return next.handle(cloned_req);
  }

  getToken(): string {
    var auth_token: string | null = localStorage.getItem('auth_token');
    if (auth_token) {
      // logged in so return true
      return auth_token;
    }

    return '';
  }
}
