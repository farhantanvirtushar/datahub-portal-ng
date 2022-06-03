import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MultiApexChart } from 'src/app/shared/models/dashboard/MultiApexChart';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  col_span: number = 2;
  window_sm: number = 600;
  window_md: number = 1000;
  durationInSeconds: number = 5;
  form_submitted: boolean = false;
  data_loaded: boolean = false;

  agency_usage$: Observable<MultiApexChart>;

  constructor(private dashboardService: DashboardService) {
    this.agency_usage$ = this.dashboardService.getAgencyChart();
  }

  ngOnInit(): void {
    this.adjustColumns();
  }

  onResize(event: any) {
    this.adjustColumns();
  }

  adjustColumns() {
    if (window.innerWidth <= this.window_sm) {
      this.col_span = 6;
    } else {
      this.col_span = 3;
    }
  }
}
