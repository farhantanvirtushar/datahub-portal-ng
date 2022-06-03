import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, map, Observable, throwError } from 'rxjs';
import { DataTableParam } from 'src/app/shared/models/DataTableParam';
import { DataTableResponse } from 'src/app/shared/models/DataTableResponse';
import { PartnerBean } from 'src/app/shared/models/partner/PartnerBean';
import { PartnerInfoBean } from 'src/app/shared/models/partner/PartnerInfoBean';
import { SlaInfoBean } from 'src/app/shared/models/partner/SlaInfoBean';
import { RestApiResponse } from 'src/app/shared/models/rest/RestApiResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PartnerService {
  backend_url = environment.API_URL;
  partner_list_url = '/rest/partner/get-data';
  partner_edit_url = '/rest/partner/edit';
  partner_create_url = '/rest/partner/create';
  partner_details_url = '/rest/partner/details';
  partner_details_with_sla_url = '/rest/partner/details-with-sla';
  get_all_sla_url = '/rest/partner/all-sla';
  assign_sla_url = '/rest/partner/assign-sla';

  constructor(private http: HttpClient) {}

  getPartnerList(
    dataTableParam: DataTableParam
  ): Observable<DataTableResponse<PartnerBean>> {
    return this.http
      .get<RestApiResponse<DataTableResponse<PartnerBean>>>(
        this.backend_url + this.partner_list_url,
        {
          params: { ...dataTableParam },
        }
      )
      .pipe(map((res) => res.success.data));
  }

  getPartnerDetails(id: number): Observable<PartnerBean> {
    console.log('getting partner');

    return this.http
      .get<RestApiResponse<PartnerBean>>(
        this.backend_url + `${this.partner_details_url}/${id}`
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(error);
        }),
        map((res) => res.success.data)
      );
  }

  editPartner(partnerBean: PartnerBean) {
    return this.http
      .post<RestApiResponse<string>>(
        this.backend_url + this.partner_edit_url,
        partnerBean
      )
      .pipe(map((res) => res.success.data));
  }
  createPartner(partnerBean: PartnerBean) {
    return this.http
      .post<RestApiResponse<string>>(
        this.backend_url + this.partner_create_url,
        partnerBean
      )
      .pipe(map((res) => res.success.data));
  }

  partnerDetailsWithAssignedSla(id: number): Observable<PartnerInfoBean> {
    return this.http
      .get<RestApiResponse<PartnerInfoBean>>(
        this.backend_url + `${this.partner_details_with_sla_url}/${id}`
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(error);
        }),
        map((res) => res.success.data)
      );
  }

  getAllSla(): Observable<SlaInfoBean[]> {
    return this.http
      .get<RestApiResponse<SlaInfoBean[]>>(
        this.backend_url + this.get_all_sla_url
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(error);
        }),
        map((res) => res.success.data)
      );
  }

  assignSla(partnerInfoBean: PartnerInfoBean) {
    return this.http
      .post<RestApiResponse<string>>(
        this.backend_url + this.assign_sla_url,
        partnerInfoBean
      )
      .pipe(map((res) => res.success.data));
  }
}
