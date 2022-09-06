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

  constructor( 
    public api: ApiService,
    public router: Router,
    private location:Location,
    private util:UtilService
  ) {
    let userInfo = localStorage.getItem("user");
    console.log(userInfo);
    
    if(userInfo === null){
      this.router.navigate(['/signin']);
    }
  }

  ngOnInit() {
    let userInfo = localStorage.getItem("user");
    console.log(userInfo);
    
    if(userInfo === null){
      this.router.navigate(['/signin']);
    }

  }


  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
