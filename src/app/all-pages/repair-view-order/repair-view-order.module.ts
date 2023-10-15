import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepairViewOrderPageRoutingModule } from './repair-view-order-routing.module';

import { RepairViewOrderPage } from './repair-view-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepairViewOrderPageRoutingModule
  ],
  declarations: [RepairViewOrderPage]
})
export class RepairViewOrderPageModule {}
