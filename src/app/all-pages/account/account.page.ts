import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage {

  hasUser = false;
  copywriteDate = new Date('2011-02-02T08:00:00Z')
  constructor( 
    public api: ApiService,
    public router: Router,
    private location:Location,
    private util:UtilService,
    private alertController: AlertController,
  ) {
    
  }

  ionViewWillEnter(){
    if(localStorage.hasOwnProperty('user')){
      this.hasUser = true;
    }
  }

  ngOnInit() {
   

  }

  async logoutAlert() {
    
    const alert = await this.alertController.create({
      header: 'Logout to Device?',
      message: 'Are you sure to logout from your account',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.logout()
          },
        },
      ],
    });

    await alert.present();
  }

  logout(){
    localStorage.clear();
    this.util.presentToast("You have successfuly logged out form your account")
    window.location.reload();
  }
}
