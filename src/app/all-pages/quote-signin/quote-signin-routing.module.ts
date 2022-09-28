import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuoteSigninPage } from './quote-signin.page';

const routes: Routes = [
  {
    path: '',
    component: QuoteSigninPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuoteSigninPageRoutingModule {}
