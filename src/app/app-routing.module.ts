import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./all-pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./all-pages/orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./all-pages/search/search.module').then( m => m.SearchPageModule)
  },  {
    path: 'brands',
    loadChildren: () => import('./all-pages/brands/brands.module').then( m => m.BrandsPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./all-pages/products/products.module').then( m => m.ProductsPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
