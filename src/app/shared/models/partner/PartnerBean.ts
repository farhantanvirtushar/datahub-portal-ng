import { PartnerType } from './PartnerType';
import { ServiceType } from './ServiceType';
import { UserBean } from './UserBean';

export interface PartnerBean {
  id: number;
  name: string;
  partnerType: PartnerType;
  serviceType: ServiceType;
  adminContactDesignation: string;
  address: string;
  email: string;
  website: string;
  ipList: string;
  maxSession: number;
  maxSubUser: number;
  billingRate: number;
  status: string;
  adminUserName: string;
  userBean: UserBean;
}
