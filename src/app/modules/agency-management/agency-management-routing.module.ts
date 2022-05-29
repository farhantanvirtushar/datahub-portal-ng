import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignSlaComponent } from './pages/assign-sla/assign-sla.component';
import { CreatePartnerComponent } from './pages/create-partner/create-partner.component';
import { EditPartnerComponent } from './pages/edit-partner/edit-partner.component';
import { PartnerComponent } from './pages/partner/partner.component';

const routes: Routes = [
  {
    path: '',
    component: PartnerComponent,
  },
  {
    path: 'create',
    component: CreatePartnerComponent,
  },
  {
    path: 'edit/:id',
    component: EditPartnerComponent,
  },
  {
    path: 'assign-sla',
    component: AssignSlaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgencyManagementRoutingModule {}
