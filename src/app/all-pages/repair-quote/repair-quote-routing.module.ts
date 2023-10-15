import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepairQuotePage } from './repair-quote.page';

const routes: Routes = [
  {
    path: '',
    component: RepairQuotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepairQuotePageRoutingModule {}
