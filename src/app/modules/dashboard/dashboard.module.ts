import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { StaticDataComponent } from './components/static-data/static-data.component';
import { NgChartsModule } from 'ng2-charts';
import { DailyUsageComponent } from './components/daily-usage/daily-usage.component';
import { MonthlyUsageComponent } from './components/monthly-usage/monthly-usage.component';
import { AgencyUsageComponent } from './components/agency-usage/agency-usage.component';

@NgModule({
  declarations: [DashboardComponent, StaticDataComponent, DailyUsageComponent, MonthlyUsageComponent, AgencyUsageComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatIconModule,
    MatGridListModule,
    NgChartsModule,
  ],
})
export class DashboardModule {}
