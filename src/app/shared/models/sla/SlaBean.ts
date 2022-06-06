import { ApiEndPointEnum } from '../../utils/ApiEndPointENum';
import { PartnerInfoBean } from '../partner/PartnerInfoBean';
import { Status } from '../partner/Status';
import { MethodGroupBean } from '../request/MethodGroupBean';

export interface SlaBean {
  id: number;
  name: string;
  description: string;
  status: Status;
  partnerBeans: PartnerInfoBean[];
  methodGroupBean: MethodGroupBean;
  requestSettings: Map<ApiEndPointEnum, Object>;
  responseSettings: Map<ApiEndPointEnum, Object>;
  methodAccessEnumsList: ApiEndPointEnum[];

  selectedRequestFields: string[];

  selectedResponseFields: string[];

  brtaRequestFields: string[];

  brtaResponseFields: string[];

  esafRequestFields: string[];

  esafResponseFields: string[];

  neirRequestFields: string[];

  neirResponseFields: string[];

  ldTaxRequestFields: string[];

  ldTaxResponseFields: string[];
}
