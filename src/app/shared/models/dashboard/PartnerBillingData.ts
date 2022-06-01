import { LoggedInUserInfoBean } from './LoggedInUserInfoBean';
import { PartnerBillingBean } from './PartnerBillingBean';

export interface PartnerBillingData {
  loggedInUserInfoBean: LoggedInUserInfoBean;
  partnerName: string;
  adminContactDesignation: string;
  address: string;
  billingRate: number;

  startDate: string;
  endDate: string;
  billingDate: string;
  sendingDate: string;
  billNo: string;

  totalSuccessCount: number;
  totalFailedCount: number;
  totalProcessingCount: number;
  totalCallCount: number;
  totalBill: number;
  subUserName: string;
  apiViewName: string;
  startTime: string;
  endTime: string;
  partnerBillingBeanList: PartnerBillingBean[];
}
