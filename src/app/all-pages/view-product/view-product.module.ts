import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewProductPageRoutingModule } from './view-product-routing.module';

import { ViewProductPage } from './view-product.page';
import { ProductViewComponent } from '../../all-components/product-view/product-view.component';
import { LaptopViewComponent } from '../../all-components/laptop-view/laptop-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewProductPageRoutingModule
  ],
  declarations: [ViewProductPage,ProductViewComponent,LaptopViewComponent]
})
export class ViewProductPageModule {}
