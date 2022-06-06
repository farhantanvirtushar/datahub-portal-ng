import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSlaComponent } from './pages/create-sla/create-sla.component';
import { EditSlaComponent } from './pages/edit-sla/edit-sla.component';
import { SlaComponent } from './pages/sla/sla.component';

const routes: Routes = [
  {
    path: '',
    component: SlaComponent,
  },
  {
    path: 'create',
    component: CreateSlaComponent,
  },
  {
    path: 'edit/:id',
    component: EditSlaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SlaRoutingModule {}
