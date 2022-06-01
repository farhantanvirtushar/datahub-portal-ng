export interface PartnerBillingBean {
  partnerId: number;
  partnerName: string;
  username: string;
  callCount: number;
  successCount: number;
  failedCount: number;
  processingCount: number;
  bill: number;
  api: string;
  status: string;
  request: string;
  response: string;
  requestTime: Date;
  responseTime: Date;
  apiViewName: string;
}
