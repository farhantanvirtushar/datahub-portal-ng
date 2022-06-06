import { Status } from '../partner/Status';
import { MethodAccessBean } from './MethodAccessBean';

export interface MethodGroupBean {
  id: number;

  groupName: string;

  description: string;

  methodAccessList: MethodAccessBean[];

  status: Status;
}
