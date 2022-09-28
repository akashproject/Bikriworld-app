import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profile : any = {};
  constructor(
    public api: ApiService,
    private location:Location,
    public router: Router,
    private util:UtilService,
    ) { }

  ngOnInit() {
    this.profile = JSON.parse(localStorage.getItem("user"))
  }

  saveProfile(){
    this.profile.token = btoa(this.profile.id);
    this.util.presentLoading(); 
    this.api.post('api/save-profile', this.profile).subscribe((data: any) => {
      localStorage.setItem("user", JSON.stringify(data));
      this.util.userInfo = data;
      this.util.hideLoading();
      this.util.presentToast("Account information has been saved successfully")
    }, error => {
      this.util.hideLoading();
      this.util.presentToast("Unable to save address! Please try again")
    });
    
  }

  validate(){
  }

}
