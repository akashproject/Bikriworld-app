import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileTransfarPage } from './mobile-transfar.page';

const routes: Routes = [
  {
    path: '',
    component: MobileTransfarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileTransfarPageRoutingModule {}
