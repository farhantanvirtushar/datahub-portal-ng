import { Status } from '../partner/Status';

export interface MethodAccessBean {
  id: number;
  accessName: string;
  description: string;
  apiEndPoint: string;
  accessGroupName: string;
  status: Status;
}
