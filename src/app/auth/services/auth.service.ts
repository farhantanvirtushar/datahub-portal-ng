import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginReq } from 'src/app/shared/models/LoginReq';
import { RestApiResponse } from 'src/app/shared/models/rest/RestApiResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  backend_url = environment.API_URL;
  login_url = '/rest/auth/login';
  constructor(private http: HttpClient) {}

  login(loginReq: LoginReq): Observable<string> {
    return this.http
      .post<RestApiResponse<string>>(
        this.backend_url + this.login_url,
        loginReq
      )
      .pipe(map((res) => res.success.data));
  }
}
