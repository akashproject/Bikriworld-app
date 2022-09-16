import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';

@Component({
  selector: 'app-upi',
  templateUrl: './upi.page.html',
  styleUrls: ['./upi.page.scss'],
})
export class UpiPage implements OnInit {
  upi : any = JSON.parse(localStorage.getItem("payment"))
  constructor(
    public api: ApiService,
    private location:Location,
    public router: Router,
    private util:UtilService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  saveUpi(){
    this.util.presentLoading(); 
    let params = {
      "token" :btoa(this.upi.user_id),
      "upi_id":this.upi.upi_id,
      "id":this.upi.id
    }

    this.api.post('api/save-upi', params).subscribe((data: any) => {
      this.util.hideLoading();
      localStorage.setItem("payment",JSON.stringify(data))
      this.util.presentToast("UPI Id has been saved successfully")
      return this.modalCtrl.dismiss(null, 'confirm');
    }, error => {
      this.util.hideLoading();
      this.util.presentToast("Unable to UPI! Please try again")
    });
   
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
