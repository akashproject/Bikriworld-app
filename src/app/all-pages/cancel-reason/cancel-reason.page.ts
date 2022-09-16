import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController ,ModalController } from '@ionic/angular';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';

@Component({
  selector: 'app-cancel-reason',
  templateUrl: './cancel-reason.page.html',
  styleUrls: ['./cancel-reason.page.scss'],
})
export class CancelReasonPage implements OnInit {
  @Input() order_id: any;
  reason : any;
  userInfo : any = JSON.parse(localStorage.getItem("user"))
  constructor(
    public api: ApiService,
    private location:Location,
    public router: Router,
    private util:UtilService,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async alertModal() {
    
    const alert = await this.alertController.create({
      header: 'Cancel this order?',
      message: 'Are you sure to cancel this order',
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
            this.confirmCencel()
          },
        },
      ],
    });

    await alert.present();
  }

  confirmCencel(){
    console.log(this.reason,this.order_id);
    let params = {
      'reason':this.reason,
      'order_id':this.order_id,
      "token":btoa(this.userInfo.id)
    }
    this.util.presentLoading(); 
    this.api.post('api/cancel-order', params).subscribe((data: any) => {
      this.util.hideLoading();
      return this.modalCtrl.dismiss(null, 'confirm');
    }, error => {
      this.util.hideLoading();
      this.util.presentToast("Unable to cancel! Please try again")
      return this.modalCtrl.dismiss(null, 'cancel');
    });

   
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
