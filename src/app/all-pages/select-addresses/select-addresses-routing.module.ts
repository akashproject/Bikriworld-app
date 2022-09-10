import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectAddressesPage } from './select-addresses.page';

const routes: Routes = [
  {
    path: '',
    component: SelectAddressesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectAddressesPageRoutingModule {}
