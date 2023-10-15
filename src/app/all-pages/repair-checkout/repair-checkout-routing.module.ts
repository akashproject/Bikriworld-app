import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepairCheckoutPage } from './repair-checkout.page';

const routes: Routes = [
  {
    path: '',
    component: RepairCheckoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepairCheckoutPageRoutingModule {}
