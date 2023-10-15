import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepairProductPage } from './repair-product.page';

const routes: Routes = [
  {
    path: '',
    component: RepairProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepairProductPageRoutingModule {}
