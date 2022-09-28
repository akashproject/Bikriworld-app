import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleConditionPage } from './vehicle-condition.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleConditionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleConditionPageRoutingModule {}
