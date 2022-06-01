import { SlaInfoBean } from './SlaInfoBean';
import { Status } from './Status';

export interface PartnerInfoBean {
  id: number;
  name: string;
  status: Status;
  slaInfoBeanList: SlaInfoBean[];
}
