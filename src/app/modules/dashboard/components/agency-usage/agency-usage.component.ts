import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApexChart } from 'src/app/shared/models/dashboard/ApexChart';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-agency-usage',
  templateUrl: './agency-usage.component.html',
  styleUrls: ['./agency-usage.component.scss'],
})
export class AgencyUsageComponent implements OnInit {
  @Input()
  chart!: ApexChart;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        // position: 'right',
      },
    },
  };
  public barChartData!: ChartData<'bar', number[], string | string[]>;
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DatalabelsPlugin];
  constructor() {}

  ngOnInit(): void {
    console.log(this.chart);

    this.barChartData = {
      labels: this.chart.categories,
      datasets: this.chart.series.map((dataset) => {
        return {
          data: dataset.data,
          label: dataset.name,
        };
      }),
    };
  }
}
