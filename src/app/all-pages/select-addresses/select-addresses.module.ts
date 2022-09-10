import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectAddressesPageRoutingModule } from './select-addresses-routing.module';

import { SelectAddressesPage } from './select-addresses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectAddressesPageRoutingModule
  ],
  declarations: [SelectAddressesPage]
})
export class SelectAddressesPageModule {}
