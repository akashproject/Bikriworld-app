import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepairCheckoutPageRoutingModule } from './repair-checkout-routing.module';

import { RepairCheckoutPage } from './repair-checkout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepairCheckoutPageRoutingModule
  ],
  declarations: [RepairCheckoutPage]
})
export class RepairCheckoutPageModule {}
