import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController,AlertController  } from '@ionic/angular';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
import { CancelReasonPage } from '../cancel-reason/cancel-reason.page';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.page.html',
  styleUrls: ['./view-booking.page.scss'],
})
export class ViewBookingPage implements OnInit {

  userInfo : any = JSON.parse(localStorage.getItem("user"))
  loc : any;
  order : any = {};
  mediaUrl :any;
  constructor(public api: ApiService,
    private location:Location,
    public router: Router,
    private util:UtilService,
    private modalCtrl: ModalController,
    private alertController: AlertController
    ) { 
      this.mediaUrl = this.api.mediaURL;
      this.loc = this.location.getState(); 
      this.viewOrder(this.loc.order_id)
    }

  ngOnInit() {
   
    
  }

  async cancelOrder() {
    const alert = await this.alertController.create({
      header: 'Are you sure to cancel order ?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Confirm',
          cssClass: 'alert-button-cancel',
          handler: (blah) => {
           this.confirmCancelService();
          },
        },
        {
          text: 'Cencel',
          cssClass: 'alert-button-confirm',
        },
      ],
    });

    await alert.present();
  }

  async confirmCancelService(){    
    let params = {
      'order_id':this.order.order_id,
      "token":btoa(this.userInfo.id)
    }
    this.util.presentLoading(); 
    this.api.post('api/cancel-booking', params).subscribe((data: any) => {
      this.util.hideLoading();
      return this.modalCtrl.dismiss(null, 'confirm');
    }, error => {
      this.util.hideLoading();
      this.util.presentToast("Unable to cancel! Please try again")
      return this.modalCtrl.dismiss(null, 'cancel');
    });
  }

  viewOrder(order_id){
    this.util.presentLoading();
    this.api.get('api/view-booking/'+order_id).subscribe((data: any) => {
      this.order = data;
      this.util.hideLoading();
    });
  }

  updateOrder(){
    this.router.navigate(['/update-booking'], {state : {order_id :this.order.order_id}});
  }

}
