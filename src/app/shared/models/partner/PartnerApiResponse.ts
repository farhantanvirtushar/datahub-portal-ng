import { PartnerBean } from './PartnerBean';
import { UserBean } from './UserBean';

export interface PartnerApiResponse {
  partnerBean: PartnerBean;
  userBean: UserBean;
  partners: PartnerBean[];
  subUsers: UserBean[];
  partnerCount: number;
  subUserCount: number;
}
