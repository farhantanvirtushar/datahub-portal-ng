import { Bar } from './Bar';

export interface ApexChart {
  series: Bar[];
  categories: string[];
  linearData: number[];
  updateTime: Date;
  updateTimeString: string;
}
