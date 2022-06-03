import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, map, Observable, throwError } from 'rxjs';
import { ApexChart } from 'src/app/shared/models/dashboard/ApexChart';
import { DashboardStaticData } from 'src/app/shared/models/dashboard/DashboardStaticData';
import { MqttCredential } from 'src/app/shared/models/dashboard/MqttCredential';
import { MultiApexChart } from 'src/app/shared/models/dashboard/MultiApexChart';
import { RestApiResponse } from 'src/app/shared/models/rest/RestApiResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  backend_url = environment.API_URL;
  agency_usage_url = '/rest/dashboard-data/agency-usage';
  daily_usage_url = '/rest/dashboard-data/daily-usage';
  monthly_usage_url = '/rest/dashboard-data/monthly-usage';
  static_data_url = '/rest/dashboard-data/static-data';
  mqtt_client_url = '/rest/dashboard-data/mqtt-client-id';

  constructor(private http: HttpClient) {}

  getAgencyChart(): Observable<MultiApexChart> {
    return this.http
      .get<RestApiResponse<MultiApexChart>>(
        this.backend_url + this.agency_usage_url
      )
      .pipe(map((res) => res.success.data));
  }
  getDailyChart(): Observable<ApexChart> {
    return this.http
      .get<RestApiResponse<ApexChart>>(this.backend_url + this.daily_usage_url)
      .pipe(map((res) => res.success.data));
  }
  getMonthlyChart(): Observable<ApexChart> {
    return this.http
      .get<RestApiResponse<ApexChart>>(
        this.backend_url + this.monthly_usage_url
      )
      .pipe(map((res) => res.success.data));
  }
  getStaticData(): Observable<DashboardStaticData> {
    return this.http
      .get<RestApiResponse<DashboardStaticData>>(
        this.backend_url + this.static_data_url
      )
      .pipe(map((res) => res.success.data));
  }
  getMqttClientId(): Observable<MqttCredential> {
    return this.http
      .get<RestApiResponse<MqttCredential>>(
        this.backend_url + this.mqtt_client_url
      )
      .pipe(map((res) => res.success.data));
  }
}
