import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepairOrderPlacedPageRoutingModule } from './repair-order-placed-routing.module';

import { RepairOrderPlacedPage } from './repair-order-placed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepairOrderPlacedPageRoutingModule
  ],
  declarations: [RepairOrderPlacedPage]
})
export class RepairOrderPlacedPageModule {}
