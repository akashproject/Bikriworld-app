import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatagoriesPage } from './catagories.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CatagoriesPageRoutingModule } from './catagories-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    CatagoriesPageRoutingModule
  ],
  declarations: [CatagoriesPage]
})
export class CatagoriesPageModule {}
