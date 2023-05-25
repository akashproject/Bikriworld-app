import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountPage } from './account.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { AccountPageRoutingModule } from './account-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: AccountPage }]),
    AccountPageRoutingModule,
  ],
  declarations: [AccountPage]
})
export class AccountPageModule {}
