import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  sendOtp = false;
  mobileNo : any ;
  constructor( 
    public api: ApiService,
    private location:Location,
    public router: Router,
    private util:UtilService
  ) { }

  ngOnInit() {

  }

  sentOtp(){
    this.sendOtp = true;
  }

  validation(event){
    
  }

  gotoQuote(){
    this.router.navigate(['/quote']);
  }
}
