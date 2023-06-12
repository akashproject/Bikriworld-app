import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
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
  form_validate = false;
  validMobileNo = false;
  checkMatchOtpIsExicuted : any = false;
  userData : any = {
    'mobile':'',
    'name':'',
    'email': ''
  }
  @ViewChild('ngOtpInput') ngOtpInputRef:any;

  otpValue : any = '';
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
    this.otpValue = '';
    this.reSendOtp = false;
    let param = {
      "mobile":this.userData.mobile,
    }
    this.api.post('api/get-otp', param).subscribe((data: any) => {
      let reponse = JSON.parse(data)
      this.session_id = reponse.Details;
      this.mobileScreen = false;
      this.registerScreen = false;
      this.sendOtp = true;
      this.util.presentToast("OTP has been sent to your mobile number")
      this.startTimer()
    }, error => {
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

  mobileValidation(event){
    let mobileNo = new String(this.userData.mobile);
    console.log(mobileNo.length);
    
    if(mobileNo.length == 10){
      this.validMobileNo = true;
    } else {
      this.validMobileNo = false;
    }
    console.log(this.validMobileNo);
  }

  validation(event){
    let re = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{1,}$");
    
    if (
      this.userData.name != ''  &&
      re.test(this.userData.email)
    ) {
      console.log(this.form_validate);
      this.form_validate = true;
    } else {
      console.log(this.form_validate);
      this.form_validate = false;
    }
    
  }

  onPaste(event: ClipboardEvent){
    let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text').split("");
    this.ngOtpInputRef.setValue(pastedText);
  }

  gotoQuote(){
    this.router.navigate(['/quote']);
  }

  matchOtp() {    
    if(this.checkMatchOtpIsExicuted == false){
      this.util.presentLoading(); 
      let param = {
        "session_id":this.session_id,
        "otp_value":this.otpValue,
      }
      this.api.post('api/verify-otp', param).subscribe((data: any) => {
        let reponse = JSON.parse(data)
        this.util.hideLoading();
        if(reponse.Status == "Success") {
          this.checkMatchOtpIsExicuted = true
          if (this.userExist > 0) {
            this.getUserByMobile();
          } else {
            this.registerUserByMobile();
          }
          
        } else {
          this.util.presentToast("Otp Invalid! Please try again")
          this.util.hideLoading();
        }
        //
      }, error => {
        this.util.presentToast("Otp Invalid! Please try again")
        this.util.hideLoading();
      });
      
    }
    
  }

  onOtpChange(event){
    this.otpValue = event
    if (event.length === 6) {
        this.matchOtp()
    }
  }

  registerUserByMobile(){
    this.util.presentLoading(); 
    this.api.post('api/register-user', this.userData).subscribe((data: any) => {
      localStorage.setItem("user", JSON.stringify(data));
      this.util.userInfo = data;      
      this.util.hideLoading();      
      if(this.returnUrl == '/condition') {
        this.router.navigate(['/quote']);
      }else if(this.returnUrl == '/vehicle-condition') {
        this.router.navigate(['/select-addresses']);
      } else {
        window.location.reload();
        //this.router.navigate(['/tabs/account']);
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
      if(this.returnUrl == '/condition') {
        this.router.navigate(['/quote']);
      }else if(this.returnUrl == '/vehicle-condition') {
        this.router.navigate(['/select-addresses']);
      } else {
        window.location.reload();
      }
    }, error => {
      this.util.hideLoading();
      this.util.presentToast("Unable to Login! Please try again")
    });
  }
  
  
}
