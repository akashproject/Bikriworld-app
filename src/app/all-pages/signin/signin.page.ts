import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  sendOtp = true;
  mobileNo : any ;
  userData : any [];
  session_id : any ;
  @ViewChild("otp1") private otp1: ElementRef<HTMLInputElement>;
  @ViewChild("otp2") private otp2: ElementRef;
  @ViewChild("otp3") private otp3: ElementRef;
  @ViewChild("otp4") private otp4: ElementRef;
  @ViewChild("otp5") private otp5: ElementRef;
  @ViewChild("otp6") private otp6: ElementRef;
  one: String = "";
  two: String = "";
  three: String = "";
  four: String = "";
  five: String = "";
  six: String = "";
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

  gotoQuote(){
    this.router.navigate(['/quote']);
  }

  _focus() {
    this.otp1.nativeElement.focus();
    return true;

  }

  matchOtp() {
    const user_otp = this.one + "" + this.two + "" + this.three + "" + this.four + "" + this.five + "" + this.six;

    this.util.presentLoading(); 
    let param = {
      "session_id":this.session_id,
      "otp_value":user_otp,
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

    // if (this.otpValue == user_otp) {
    //   console.log("equal")
    //   //this.util.presentToast("");
    //   this.getUserByMobile();
    // } else {
    //   console.log("not equal");      
    //   this.util.presentToast("The OTP did not match");
    //   setTimeout(() => {
    //   this.one = "";
    //   this.two = "";this.three = "";this.four = "";this.five = "";this.six = "";

    //   },1900);
      
    // }

  }

  gotoNextField(next) {
    console.log(next);
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
