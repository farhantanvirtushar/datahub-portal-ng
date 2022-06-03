import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexChart } from 'src/app/shared/models/dashboard/ApexChart';
import { DashboardService } from '../../services/dashboard.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-monthly-usage',
  templateUrl: './monthly-usage.component.html',
  styleUrls: ['./monthly-usage.component.scss'],
})
export class MonthlyUsageComponent implements OnInit {
  monthly_usage$: Observable<ApexChart>;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        // position: 'right',
      },
    },
  };
  public lineChartData!: ChartData<'line', number[], string | string[]>;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [DatalabelsPlugin];

  constructor(private dashboardService: DashboardService) {
    this.monthly_usage$ = this.dashboardService.getMonthlyChart();
    this.monthly_usage$.subscribe({
      next: (apexChart: ApexChart) => {
        console.log(apexChart);

        this.lineChartData = {
          labels: apexChart.categories,
          datasets: apexChart.series.map((dataset) => {
            return {
              data: dataset.data,
            };
          }),
        };
      },
    });
  }

  ngOnInit(): void {}
}
