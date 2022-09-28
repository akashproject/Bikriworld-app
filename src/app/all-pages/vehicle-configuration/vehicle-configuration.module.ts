import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleConfigurationPageRoutingModule } from './vehicle-configuration-routing.module';

import { VehicleConfigurationPage } from './vehicle-configuration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleConfigurationPageRoutingModule
  ],
  declarations: [VehicleConfigurationPage]
})
export class VehicleConfigurationPageModule {}
