import { Component } from '@angular/core';
import { UtilService } from 'src/app/all-services/util.service';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private util:UtilService
  ) {}

  ionViewWillEnter(){
    if(localStorage.hasOwnProperty('user')){
      this.util.reset()
    }
  }

  
}
