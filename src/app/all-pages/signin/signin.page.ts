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
  mobileScreen = true;
  registerScreen = false;
  sendOtp = false;
  reSendOtp = false;
  session_id : any ;
  timeLeft: number = 60;
  interval;
  loc
  userExist : any = '';

  userData : any = {
    'mobile':'',
    'name':'',
    'email': ''
  }

  @ViewChild("otp1") otp1:HTMLIonInputElement;
  @ViewChild('otp2') otp2:HTMLIonInputElement;
  @ViewChild("otp3") otp3:HTMLIonInputElement;
  @ViewChild("otp4") otp4:HTMLIonInputElement;
  @ViewChild("otp5") otp5:HTMLIonInputElement;
  @ViewChild("otp6") otp6:HTMLIonInputElement;
  otpValue : any = [];
  otpInput : any ;
  disable: Boolean = true;
  returnUrl : any;
  constructor( 
    public api: ApiService,
    private location:Location,
    public router: Router,
    private util:UtilService
  ) { }

  ngOnInit() {
    this.loc = this.location.getState();
    this.returnUrl = this.loc.returnUrl;
  }

  ionViewWillEnter(){
    this.mobileScreen = true;
    this.registerScreen = false;
    this.sendOtp = false;
    this.reSendOtp = false;
    this.loc = this.location.getState();
    this.returnUrl = this.loc.returnUrl;
  }

  checkUserExist(){
    this.util.presentLoading(); 
    let param = {
      "mobile":this.userData.mobile,
    }
    this.api.post('api/check-user-exist', param).subscribe((data: any) => {
     this.userExist = data;
     if (data > 0) {
      this.sentOtp();
     } else {
      this.mobileScreen = false;
      this.registerScreen = true;
     }
     this.util.hideLoading();
    }, error => {
      this.util.hideLoading();
    });
  }

  sentOtp(){
    this.reSendOtp = false;
    this.util.presentLoading(); 
    let param = {
      "mobile":this.userData.mobile,
    }
    this.api.post('api/get-otp', param).subscribe((data: any) => {
      let reponse = JSON.parse(data)
      this.session_id = reponse.Details;
      this.mobileScreen = false;
      this.registerScreen = false;
      this.sendOtp = true;
      this.util.hideLoading();
      this.util.presentToast("OTP has been sent to your mobile number")
      this.startTimer()
    }, error => {
      this.util.hideLoading();
      this.util.presentToast("Unable to send OTP! Please try again")
    });
    
  }

  startTimer() {
    this.timeLeft = 60;
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.reSendOtp = true;
      }
    },1000)
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
        if (this.userExist > 0) {
          this.getUserByMobile();
        } else {
          this.registerUserByMobile();
        }
        
      } else {
        this.util.presentToast(reponse.Details)
      }
      //
    }, error => {
      this.util.hideLoading();
      this.util.presentToast("Unable to send OTP! Please try again")
    });

  }

  gotoNextField(event,prev,next) {      
    console.log(event.key);  
    let re = new RegExp("^(?=.*[0-9])");
    if(re.test(event.key)){
      next.setFocus()
    }else if(event.key == "Backspace"){
      prev.setFocus()
    } 

  }

  gotoPrevField(event,prev) {
    if(event.key == "Backspace"){
      prev.setFocus()
    }
  }

  registerUserByMobile(){
    this.util.presentLoading(); 
    this.api.post('api/register-user', this.userData).subscribe((data: any) => {
      localStorage.setItem("user", JSON.stringify(data));
      this.util.userInfo = data;      
      this.util.hideLoading();
      console.log(this.returnUrl);
      
      if(this.returnUrl == '/condition') {
        this.router.navigate(['/quote']);
      }else if(this.returnUrl == '/vehicle-condition') {
        this.router.navigate(['/select-addresses']);
      } else {
        this.router.navigate(['/tabs/account']);
      }
      
    }, error => {
      this.util.hideLoading();
      this.util.presentToast("Unable to Login! Please try again")
    });
  }

  getUserByMobile(){
    this.util.presentLoading(); 
    let param = {
      "mobile":this.userData.mobile,
    }
    this.api.post('api/get-user', param).subscribe((data: any) => {
      localStorage.setItem("user", JSON.stringify(data));
      this.util.userInfo = data;      
      this.util.hideLoading();
      console.log(this.returnUrl);
      
      if(this.returnUrl == '/condition') {
        this.router.navigate(['/quote']);
      }else if(this.returnUrl == '/vehicle-condition') {
        this.router.navigate(['/select-addresses']);
      } else {
        this.router.navigate(['/tabs/account']);
      }
      
    }, error => {
      this.util.hideLoading();
      this.util.presentToast("Unable to Login! Please try again")
    });
  }
  
}
