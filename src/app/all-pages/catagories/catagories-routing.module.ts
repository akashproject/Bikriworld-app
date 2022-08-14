import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatagoriesPage } from './catagories.page';

const routes: Routes = [
  {
    path: '',
    component: CatagoriesPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatagoriesPageRoutingModule {}
