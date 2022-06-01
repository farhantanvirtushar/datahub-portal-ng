import { LoggedInUserInfoBean } from './LoggedInUserInfoBean';

export interface AgencySummaryReportBean {
  loggedInUserInfoBean: LoggedInUserInfoBean;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}
