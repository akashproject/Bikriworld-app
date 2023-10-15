import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepairViewOrderPage } from './repair-view-order.page';

const routes: Routes = [
  {
    path: '',
    component: RepairViewOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepairViewOrderPageRoutingModule {}
