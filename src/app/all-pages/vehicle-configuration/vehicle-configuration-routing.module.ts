import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleConfigurationPage } from './vehicle-configuration.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleConfigurationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleConfigurationPageRoutingModule {}
