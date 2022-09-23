import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./guard/auth.guard";
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./all-pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./all-pages/orders/orders.module').then( m => m.OrdersPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    loadChildren: () => import('./all-pages/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'brands',
    loadChildren: () => import('./all-pages/brands/brands.module').then( m => m.BrandsPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./all-pages/products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'view-product',
    loadChildren: () => import('./all-pages/view-product/view-product.module').then( m => m.ViewProductPageModule)
  },
  {
    path: 'question',
    loadChildren: () => import('./all-pages/question/question.module').then( m => m.QuestionPageModule)
  },
  {
    path: 'accessories',
    loadChildren: () => import('./all-pages/accessories/accessories.module').then( m => m.AccessoriesPageModule)
  },
  {
    path: 'age',
    loadChildren: () => import('./all-pages/age/age.module').then( m => m.AgePageModule)
  },
  {
    path: 'condition',
    loadChildren: () => import('./all-pages/condition/condition.module').then( m => m.ConditionPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./all-pages/signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'quote',
    loadChildren: () => import('./all-pages/quote/quote.module').then( m => m.QuotePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'addresses',
    loadChildren: () => import('./all-pages/addresses/addresses.module').then( m => m.AddressesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'view-address',
    loadChildren: () => import('./all-pages/view-address/view-address.module').then( m => m.ViewAddressPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./all-pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'upi',
    loadChildren: () => import('./all-pages/upi/upi.module').then( m => m.UpiPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'bank',
    loadChildren: () => import('./all-pages/bank/bank.module').then( m => m.BankPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'select-addresses',
    loadChildren: () => import('./all-pages/select-addresses/select-addresses.module').then( m => m.SelectAddressesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'payments',
    loadChildren: () => import('./all-pages/payments/payments.module').then( m => m.PaymentsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'view-order',
    loadChildren: () => import('./all-pages/view-order/view-order.module').then( m => m.ViewOrderPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cancel-reason',
    loadChildren: () => import('./all-pages/cancel-reason/cancel-reason.module').then( m => m.CancelReasonPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'order-placed',
    loadChildren: () => import('./all-pages/order-placed/order-placed.module').then( m => m.OrderPlacedPageModule),
    canActivate: [AuthGuard]
  },  {
    path: 'mobile-transfar',
    loadChildren: () => import('./all-pages/mobile-transfar/mobile-transfar.module').then( m => m.MobileTransfarPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./all-pages/test/test.module').then( m => m.TestPageModule)
  },
  {
    path: 'configuration',
    loadChildren: () => import('./all-pages/configuration/configuration.module').then( m => m.ConfigurationPageModule)
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
