import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage {

  hasUser = false;
  constructor( 
    public api: ApiService,
    public router: Router,
    private location:Location,
    private util:UtilService
  ) {
    
  }

  ionViewWillEnter(){
    if(localStorage.hasOwnProperty('user')){
      this.hasUser = true;
    }
  }

  ngOnInit() {
   

  }


  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
