import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ApexChart } from 'src/app/shared/models/dashboard/ApexChart';
import { DashboardService } from '../../services/dashboard.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-daily-usage',
  templateUrl: './daily-usage.component.html',
  styleUrls: ['./daily-usage.component.scss'],
})
export class DailyUsageComponent implements OnInit {
  daily_usage$: Observable<ApexChart>;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @ViewChild('myCanvas')
  canvas!: ElementRef;
  gradient: any;
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },

      // tooltip: {
      //   callbacks: {
      //     label: function (tooltipItem) {
      //       return tooltipItem.label + ' : ' + tooltipItem.formattedValue;
      //     },
      //   },
      // },

      // datalabels: {
      //   formatter: (value, ctx) => {},
      // },
    },
  };
  public pieChartData!: ChartData<'pie', number[], string | string[]>;
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

  constructor(private dashboardService: DashboardService) {
    this.daily_usage$ = this.dashboardService.getDailyChart();
    this.daily_usage$.subscribe({
      next: (apexChart: ApexChart) => {
        this.pieChartData = {
          labels: apexChart.categories,
          datasets: [
            {
              data: apexChart.linearData,
              // backgroundColor: this.gradient,
            },
          ],
        };
      },
    });
  }

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.gradient = this.canvas.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 500);
    this.gradient.addColorStop(0, '#0b2e4d');
    this.gradient.addColorStop(1, '#34628b');
  }
}
