import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
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
  userData : any [];
  session_id : any ;
  @ViewChild("otp1") otp1:HTMLIonInputElement;
  @ViewChild('otp2') otp2:HTMLIonInputElement;
  @ViewChild("otp3") otp3:HTMLIonInputElement;
  @ViewChild("otp4") otp4:HTMLIonInputElement;
  @ViewChild("otp5") otp5:HTMLIonInputElement;
  @ViewChild("otp6") otp6:HTMLIonInputElement;
  otpValue : any = [];
  otpInput : any ;
  disable: Boolean = true;
  constructor( 
    public api: ApiService,
    private location:Location,
    public router: Router,
    private util:UtilService
  ) { }

  ngOnInit() {

  }

  sentOtp(){
    this.util.presentLoading(); 
    let param = {
      "mobile":this.mobileNo,
    }
    this.api.post('api/get-otp', param).subscribe((data: any) => {
      let reponse = JSON.parse(data)
      console.log(reponse);

      this.session_id = reponse.Details;
      this.sendOtp = true;
      this.util.hideLoading();
      this.util.presentToast("OTP has been sent to your mobile number")
    }, error => {
      this.util.hideLoading();
      this.util.presentToast("Unable to send OTP! Please try again")
    });
    
  }

  validation(event){
    
  }

  onPaste(event: ClipboardEvent){
    let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text').split("");
    this.otpValue = pastedText;
  }

  gotoQuote(){
    this.router.navigate(['/quote']);
  }

  matchOtp() {
    this.util.presentLoading(); 
    let param = {
      "session_id":this.session_id,
      "otp_value":this.otpValue.join(""),
    }
    this.api.post('api/verify-otp', param).subscribe((data: any) => {
      let reponse = JSON.parse(data)
      this.util.hideLoading();
      if(reponse.Status == "Success") {
        this.getUserByMobile();
      } else {
        this.util.presentToast(reponse.Details)
      }
      //
    }, error => {
      this.util.hideLoading();
      this.util.presentToast("Unable to send OTP! Please try again")
    });

  }

  gotoNextField(next) {
    console.log(next.setFocus());
    
  }

  getUserByMobile(){
    this.util.presentLoading(); 
    let param = {
      "mobile":this.mobileNo,
    }
    this.api.post('api/get-user', param).subscribe((data: any) => {
      localStorage.setItem("user", JSON.stringify(data));
      this.util.userInfo = data;
      console.log(this.util.userInfo);
      
      this.util.hideLoading();
      this.gotoQuote()
    }, error => {
      this.util.hideLoading();
      this.util.presentToast("Unable to Login! Please try again")
    });
  }
  
}
