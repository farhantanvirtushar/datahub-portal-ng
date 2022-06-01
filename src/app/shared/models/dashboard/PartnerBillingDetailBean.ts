import { PartnerBillingBean } from './PartnerBillingBean';

export interface PartnerBillingDetailBean {
  partnerId: number;
  totalSuccessCount: number;
  totalFailedCount: number;
  totalProcessingCount: number;
  totalCallCount: number;
  totalBill: number;
  apiEnd: string;
  apiViewName: string;
  partnerBillingBeanList: PartnerBillingBean[];
}
