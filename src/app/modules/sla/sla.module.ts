import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlaRoutingModule } from './sla-routing.module';
import { SlaComponent } from './pages/sla/sla.component';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DeactivateDialogComponent } from './components/deactivate-dialog/deactivate-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateSlaComponent } from './pages/create-sla/create-sla.component';
import { EditSlaComponent } from './pages/edit-sla/edit-sla.component';

@NgModule({
  declarations: [SlaComponent, DeactivateDialogComponent, CreateSlaComponent, EditSlaComponent],
  imports: [
    CommonModule,
    SlaRoutingModule,
    MatTableModule,
    SharedModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
})
export class SlaModule {}
