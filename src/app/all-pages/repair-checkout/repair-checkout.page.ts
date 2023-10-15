import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController , ModalController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
import { ViewAddressPage } from '../view-address/view-address.page';
import { PamentOptionsComponent } from '../../all-components/pament-options/pament-options.component';
import * as moment from 'moment';

@Component({
  selector: 'app-repair-checkout',
  templateUrl: './repair-checkout.page.html',
  styleUrls: ['./repair-checkout.page.scss'],
})
export class RepairCheckoutPage implements OnInit {

  step : any = 1;
  addresses : any = [];
  loc : any;
  selected_address : any;
  profile : any = JSON.parse(localStorage.getItem("user"))
  minDate = moment().format();
  pickupSchedule : string;
  disableBtn = true;
  constructor(
    public api: ApiService,
    public router: Router,
    private location:Location,
    private util:UtilService,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) { }

  ionViewWillEnter(){
    this.getAddress()
  }

  ngOnInit() {
    //this.getAddress()
  }

  getAddress(){
    this.util.presentLoading(); 
    let param = {
      "token":btoa(this.profile.id),
    }
    this.api.post('api/addresses', param).subscribe((data: any) => {
      this.addresses = data;      
      this.util.hideLoading();
    }, error => {

    });
  }

  async modalViewAddress(address_id = null){
    const modal = await this.modalCtrl.create({
      component: ViewAddressPage,
      componentProps: { address_id: address_id }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.getAddress();
    }
  }

  async confirmDelete(id) {
    
    const alert = await this.alertController.create({
      header: 'Delete this address?',
      message: 'Once you delete! address permanently removed form your account',
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
            this.deleteAddress(id)
          },
        },
      ],
    });

    await alert.present();
  }

  deleteAddress(id){
    this.util.presentLoading(); 
    let param = {
      "token":btoa(this.profile.id),
      "address_id":id
    }
    this.api.post('api/delete-address', param).subscribe((data: any) => {
      this.addresses = data;
      this.getAddress();
      this.util.hideLoading();
    }, error => {
      this.util.hideLoading();
    });
  }

  async selectAddress(id){
    localStorage.setItem("address_id",id)
    this.step = 2
  }

  async selectPaymentOption(){
    this.router.navigate(['/pickup']);
  }

  setSchedule(event){
    this.pickupSchedule = event.detail.value.split('T')[0];
    this.disableBtn = false;
  }

  placeOrder(){    
    let orderDetails = {
      "parts": localStorage.getItem("selectedParts"),
      "token": btoa(this.profile.id),
      "product_id": localStorage.getItem("product_id"),
      "amount": localStorage.getItem("totalAmount"),
      "pickup_schedule": this.pickupSchedule,
      "address_id": localStorage.getItem("address_id"),
    }

    console.log(orderDetails);
    
    this.api.post('api/place-booking', orderDetails).subscribe((data: any) => {
      localStorage.setItem("orderData", JSON.stringify(data));
      this.util.hideLoading();
      this.router.navigate(['/repair-order-placed']);
    }, error => {
      this.util.hideLoading();
      this.util.presentToast("Unable to Place Order! Please try again")
    });  
  }
  
}
