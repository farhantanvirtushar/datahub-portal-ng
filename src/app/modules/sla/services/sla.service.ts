import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { DataTableParam } from 'src/app/shared/models/DataTableParam';
import { DataTableResponse } from 'src/app/shared/models/DataTableResponse';
import { RestApiResponse } from 'src/app/shared/models/rest/RestApiResponse';
import { SlaBean } from 'src/app/shared/models/sla/SlaBean';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SlaService {
  backend_url = environment.API_URL;
  sla_list_url = '/rest/sla/get-data';
  sla_edit_url = '/rest/sla/edit';
  sla_create_url = '/rest/sla/create';
  sla_details_url = '/rest/sla/detail';
  sla_details_with_sla_url = '/rest/sla/details-with-sla';
  get_all_sla_url = '/rest/sla/all-sla';
  activate_sla_url = '/rest/sla/activate/{id}';
  deactivate_sla_url = '/rest/sla/de-activate/{id}';
  requestFields_url = '/rest/sla/requestFields';
  responseFields_url = '/rest/sla/responseFields';

  constructor(private http: HttpClient) {}

  getSlaList(
    dataTableParam: DataTableParam
  ): Observable<DataTableResponse<SlaBean>> {
    return this.http
      .get<RestApiResponse<DataTableResponse<SlaBean>>>(
        this.backend_url + this.sla_list_url,
        {
          params: { ...dataTableParam },
        }
      )
      .pipe(map((res) => res.success.data));
  }

  getSlaDetails(id: number): Observable<SlaBean> {
    console.log('getting partner');

    return this.http
      .get<RestApiResponse<SlaBean>>(
        this.backend_url + this.sla_details_url.replace('{id}', id.toString())
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(error);
        }),
        map((res) => res.success.data)
      );
  }

  getRequestFields(): Observable<Map<String, Map<String, String>>> {
    return this.http
      .get<RestApiResponse<Map<String, Map<String, String>>>>(
        this.backend_url + this.requestFields_url
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(error);
        }),
        map((res) => res.success.data)
      );
  }
  getResponseFields(): Observable<Map<String, Map<String, String>>> {
    return this.http
      .get<RestApiResponse<Map<String, Map<String, String>>>>(
        this.backend_url + this.responseFields_url
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(error);
        }),
        map((res) => res.success.data)
      );
  }

  activate(id: number): Observable<string> {
    return this.http
      .get<RestApiResponse<string>>(
        this.backend_url + this.activate_sla_url.replace('{id}', id.toString())
      )
      .pipe(map((res) => res.success.data));
  }
  deactivate(id: number): Observable<string> {
    return this.http
      .get<RestApiResponse<string>>(
        this.backend_url +
          this.deactivate_sla_url.replace('{id}', id.toString())
      )
      .pipe(map((res) => res.success.data));
  }
}
