import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { AlertController ,ModalController } from '@ionic/angular';
import { UtilService } from 'src/app/all-services/util.service';
import * as moment from 'moment';

@Component({
  selector: 'app-pickup-options',
  templateUrl: './pickup-options.component.html',
  styleUrls: ['./pickup-options.component.scss'],
})
export class PickupOptionsComponent {
  pickupSchedule : string;
  public minDate = moment().format();
  profile : any = JSON.parse(localStorage.getItem("user"))
  calculatedData : any = JSON.parse(localStorage.getItem("calculatedData"))
  category_id : any;
  ConfirmLabel
  constructor(
    public api: ApiService,
    public router: Router,
    private util:UtilService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    if(localStorage.getItem("category_id") == "12"){
      this.ConfirmLabel = "Schedule Appointment"
    } else {
      this.ConfirmLabel = "Comfirm Pickup"
    }
  }

  confirm(){
    if(localStorage.getItem("category_id") == "12"){
      this.comfirmAppointment()
    } else {
      this.placeOrder()
    }
  }

  placeOrder(){    
    let orderDetails = {
      "question_id": localStorage.getItem("questions"),
      "accessories": localStorage.getItem("accessories"),
      "age_id": localStorage.getItem("age"),
      "token": btoa(this.profile.id),
      "product_id": this.calculatedData.product_id,
      "variation_type": this.calculatedData.variation_type,
      "amount": this.calculatedData.exact_price,
      "payment_mode": localStorage.getItem("payment_mode"),
      "pickup_schedule": this.pickupSchedule,
      "address_id": localStorage.getItem("address_id"),
    }

    this.api.post('api/place-order', orderDetails).subscribe((data: any) => {
      localStorage.setItem("orderData", JSON.stringify(data));
      this.util.hideLoading();
      this.modalCtrl.dismiss(null, 'confirm');
      this.router.navigate(['/order-placed']);
    }, error => {
      this.util.hideLoading();
      this.util.presentToast("Unable to Place Order! Please try again")
    });  
  }

  comfirmAppointment(){
    let orderDetails = {
      "accessories": localStorage.getItem("accessories"),
      "condition_id": localStorage.getItem("condition"),
      "token": btoa(this.profile.id),
      "product_id": localStorage.getItem("product_id"),
      "variation_type": localStorage.getItem("variation_type"),
      "payment_mode": localStorage.getItem("payment_mode"),
      "pickup_schedule": this.pickupSchedule,
      "address_id": localStorage.getItem("address_id"),
    }

    this.api.post('api/confirm-booking', orderDetails).subscribe((data: any) => {
      localStorage.setItem("orderData", JSON.stringify(data));
      this.util.hideLoading();
      this.modalCtrl.dismiss(null, 'confirm');
      this.router.navigate(['/order-placed']);
    }, error => {
      this.util.hideLoading();
      this.util.presentToast("Unable to Place Order! Please try again")
    });  
  }

  setSchedule(event){
    this.pickupSchedule = event.detail.value.split('T')[0];
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
