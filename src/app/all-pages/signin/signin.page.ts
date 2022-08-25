import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  sendOtp = false;
  mobileNo : any ;
  constructor() { }

  ngOnInit() {

  }

  sentOtp(){
    this.sendOtp = true;
  }

  validation(event){
    
  }

}
