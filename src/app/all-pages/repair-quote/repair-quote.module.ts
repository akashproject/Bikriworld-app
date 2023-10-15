import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepairQuotePageRoutingModule } from './repair-quote-routing.module';

import { RepairQuotePage } from './repair-quote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepairQuotePageRoutingModule
  ],
  declarations: [RepairQuotePage]
})
export class RepairQuotePageModule {}
