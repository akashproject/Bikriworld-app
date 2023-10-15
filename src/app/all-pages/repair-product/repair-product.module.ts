import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepairProductPageRoutingModule } from './repair-product-routing.module';
import { RepairViewComponent } from '../../all-components/repair-view/repair-view.component';
import { RepairProductPage } from './repair-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepairProductPageRoutingModule
  ],
  declarations: [RepairProductPage,RepairViewComponent]
})
export class RepairProductPageModule {}
