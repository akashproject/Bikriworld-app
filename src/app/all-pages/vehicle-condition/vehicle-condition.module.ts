import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleConditionPageRoutingModule } from './vehicle-condition-routing.module';

import { VehicleConditionPage } from './vehicle-condition.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleConditionPageRoutingModule
  ],
  declarations: [VehicleConditionPage]
})
export class VehicleConditionPageModule {}
