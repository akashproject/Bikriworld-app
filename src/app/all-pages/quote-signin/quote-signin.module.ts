import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuoteSigninPageRoutingModule } from './quote-signin-routing.module';

import { QuoteSigninPage } from './quote-signin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuoteSigninPageRoutingModule
  ],
  declarations: [QuoteSigninPage]
})
export class QuoteSigninPageModule {}
