import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileTransfarPageRoutingModule } from './mobile-transfar-routing.module';

import { MobileTransfarPage } from './mobile-transfar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobileTransfarPageRoutingModule
  ],
  declarations: [MobileTransfarPage]
})
export class MobileTransfarPageModule {}
