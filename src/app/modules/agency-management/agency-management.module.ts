import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyManagementRoutingModule } from './agency-management-routing.module';
import { PartnerComponent } from './pages/partner/partner.component';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EditPartnerComponent } from './pages/edit-partner/edit-partner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CreatePartnerComponent } from './pages/create-partner/create-partner.component';
import { AssignSlaComponent } from './pages/assign-sla/assign-sla.component';

@NgModule({
  declarations: [
    PartnerComponent,
    EditPartnerComponent,
    CreatePartnerComponent,
    AssignSlaComponent,
  ],
  imports: [
    CommonModule,
    AgencyManagementRoutingModule,
    SharedModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatSnackBarModule,
    MatCheckboxModule,
  ],
})
export class AgencyManagementModule {}
