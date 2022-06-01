import { Time } from '@angular/common';

export interface BillingReportRequest {
  partnerId: number;

  username: string;

  apiId: number;

  endTime: Date;

  startDate: Date;

  endDate: Date;

  start: number;
  length: number;
}
