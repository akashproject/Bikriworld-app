import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';

@Component({
  selector: 'app-mobile-transfar',
  templateUrl: './mobile-transfar.page.html',
  styleUrls: ['./mobile-transfar.page.scss'],
})
export class MobileTransfarPage implements OnInit {
  mobile : any = JSON.parse(localStorage.getItem("payment"))
  constructor(
    public api: ApiService,
    private location:Location,
    public router: Router,
    private util:UtilService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  saveMobileTransfar(){
    this.util.presentLoading(); 
    let params = {
      "token" :btoa(this.mobile.user_id),
      "online_payment_no":this.mobile.online_payment_no,
      "id":this.mobile.id
    }

    this.api.post('api/save-mobile-transfar', params).subscribe((data: any) => {
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
