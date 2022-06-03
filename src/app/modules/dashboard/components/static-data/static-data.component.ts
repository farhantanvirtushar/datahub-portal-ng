import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardStaticData } from 'src/app/shared/models/dashboard/DashboardStaticData';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-static-data',
  templateUrl: './static-data.component.html',
  styleUrls: ['./static-data.component.scss'],
})
export class StaticDataComponent implements OnInit {
  static_data$: Observable<DashboardStaticData>;
  col_span: number = 2;
  window_sm: number = 600;
  window_md: number = 1050;

  data_loaded: boolean = false;

  summary_keys: string[] = ['agency', 'serviceUser', 'portalUser', 'api'];
  summary_texts: string[] = ['Agency', 'Service User', 'Portal User', 'API'];
  today_count_keys: string[] = ['totalCount', 'successCount', 'failedCount'];
  today_count_texts: string[] = [
    'Total Count',
    'Success Count',
    'Failed Count',
  ];

  constructor(private dashboardService: DashboardService) {
    this.static_data$ = this.dashboardService.getStaticData();
  }

  ngOnInit(): void {
    this.adjustColumns();
  }
  onResize(event: any) {
    this.adjustColumns();
  }

  adjustColumns() {
    if (window.innerWidth <= this.window_md) {
      this.col_span = 2;
    } else {
      this.col_span = 1;
    }
  }
}
