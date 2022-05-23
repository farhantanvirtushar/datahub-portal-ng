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
    Authorization: '',
  });
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var token: string = this.getToken();

    this.httpHeaders = this.httpHeaders.set('Authorization', 'Bearer ' + token);

    const cloned_req = req.clone({
      headers: this.httpHeaders,
    });
    return next.handle(cloned_req);
  }

  getToken(): string {
    var auth_token: string | null = localStorage.getItem('auth_token');
    auth_token =
      'eyJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyYWZhMSIsInJvbGVzIjpbIk1FVEhPRF9HUk9VUF9BU1NJR04iLCJQQVJUTkVSX0lOQUNUSVZFIiwiU0xBX0RFVEFJTFNfQllfSUQiLCJVU0VSX0RFVEFJTFNfQllfSUQiLCJNRVRIT0RfR1JPVVBfTElTVCIsIlVTRVJfTElTVCIsIlBBUlRORVJfREVUQUlMU19CWV9JRCIsIkNBQ0hFX1JFTU9WRSIsIlVTRVJfQ1JFQVRFIiwiUEFSVE5FUl9TVUJfVVNFUl9SRVNFVF9QQVNTV09SRCIsIlNVQl9VU0VSX0FQSV9VU0FHRV9MSU1JVCIsIlVTRVJfUkVTRVRfUEFTU1dPUkQiLCJQQVJUTkVSX0xJU1QiLCJTTEFfTElTVCIsIkNPTU1PTl9VU0VSX0ZVTExfTkFNRSIsIlBBUlRORVJfQ1JFQVRFIiwiUEFSVE5FUl9TVUJfVVNFUl9ERVRBSUxTX0JZX0lEIiwiQ09NTU9OX1JPTEVTX0JZX1VTRVIiLCJQQVJUTkVSX0FTU0lHTl9TTEEiLCJNRVRIT0RfR1JPVVBfVVBEQVRFIiwiUEFSVE5FUl9TVUJfVVNFUl9MSVNUIiwiQklMTElOR19SRVBPUlRfVklFVyIsIk1FVEhPRF9HUk9VUF9ERVRBSUxTX0JZX0lEIiwiUEFSVE5FUl9TVUJfVVNFUl9VUERBVEUiLCJTTEFfSU5BQ1RJVkUiLCJTTEFfQ1JFQVRFIiwiVVNFUl9VUERBVEUiLCJEQVNIQk9BUkRfVklFVyIsIlNMQV9VUERBVEUiLCJQQVJUTkVSX1NVQl9VU0VSX0NSRUFURSIsIlBBUlRORVJfU1VCX1VTRVJfSU5BQ1RJVkUiLCJBUElfVVNBR0VfTElNSVRfVVBEQVRFIiwiTUVUSE9EX0dST1VQX0NSRUFURSIsIkVEVUNBVElPTl9EQl9NSUdSQVRJT04iLCJQQVJUTkVSX1VQREFURSIsIkNPTU1PTl9DSEFOR0VfUEFTU1dPUkQiXSwiaWF0IjoxNjUyMDc3ODU4LCJleHAiOjE4NjgwNzc4NTh9.psjn9A_edwJ9oew7UyNYG8oqC4myHO3et2WDl6UAl2s';

    if (auth_token) {
      // logged in so return true
      return auth_token;
    }

    return '';
  }
}
