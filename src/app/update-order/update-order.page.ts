import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router} from '@angular/router';
import { ApiService } from '../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
import * as moment from 'moment';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.page.html',
  styleUrls: ['./update-order.page.scss'],
})
export class UpdateOrderPage implements OnInit {
  addresses : any = [];
  loc : any;
  userInfo : any = JSON.parse(localStorage.getItem("user"))
  order : any = {};
  pickupSchedule:any;
  selected_address : any;
  paymentOption : any;
  order_id : any
  public minDate = moment().format();
  constructor(
    public api: ApiService,
    public router: Router,
    private location:Location,
    private util:UtilService, 
  ) { }

  ngOnInit() {
    this.loc = this.location.getState(); 
    this.order_id = this.loc.order_id
    this.viewOrder(this.loc.order_id)
  }

  ionViewWillEnter(){
    this.getAddress()
  }
  
  getAddress(){
    let param = {
      "token":btoa(this.userInfo.id),
    }
    this.api.post('api/addresses', param).subscribe((data: any) => {
      this.addresses = data;      
      this.util.hideLoading();
    }, error => {
      this.util.hideLoading();
    });
  }

  viewOrder(order_id){
    this.api.get('api/view-order/'+order_id).subscribe((data: any) => {
      this.paymentOption = data.payment_mode;
      this.pickupSchedule = data.pickup_schedule;
      this.selected_address = data.address_id
      this.util.hideLoading();
    }, error => {
      this.util.hideLoading();
    });
  }

  updateOrder(){
    let param = {
      "token":btoa(this.userInfo.id),
      "payment_mode": this.paymentOption,
      "pickup_schedule": this.pickupSchedule,
      "address_id": this.selected_address,
      "id": this.order_id
    }

    this.api.post('api/save-order', param).subscribe((data: any) => {      
      this.util.hideLoading();
      this.util.presentToast("Order has been updated successfully")
      this.router.navigate(['/tabs/orders']);
    }, error => {
      this.util.hideLoading();
      this.util.presentToast("Unable to save order! Please try again")
    });
  }

  setSchedule(event){
    this.pickupSchedule = event.detail.value.split('T')[0];
  }

}
