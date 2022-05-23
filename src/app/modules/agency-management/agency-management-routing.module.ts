import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPartnerComponent } from './pages/edit-partner/edit-partner.component';
import { PartnerComponent } from './pages/partner/partner.component';

const routes: Routes = [
  {
    path: '',
    component: PartnerComponent,
  },
  {
    path: 'edit/:id',
    component: EditPartnerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgencyManagementRoutingModule {}
