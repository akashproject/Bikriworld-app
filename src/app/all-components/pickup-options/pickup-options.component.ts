import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { AlertController ,ModalController } from '@ionic/angular';
import { UtilService } from 'src/app/all-services/util.service';

@Component({
  selector: 'app-pickup-options',
  templateUrl: './pickup-options.component.html',
  styleUrls: ['./pickup-options.component.scss'],
})
export class PickupOptionsComponent implements OnInit {
  pickupSchedule : string;
  constructor(
    public api: ApiService,
    public router: Router,
    private util:UtilService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  placeOrder(){
    console.log(this.pickupSchedule);
    
    this.modalCtrl.dismiss(null, 'confirm');
    this.router.navigate(['/order-placed']);
  }

  setSchedule(event){
    this.pickupSchedule = event.detail.value.split('T')[0]; 
    // 2019-04-22
    console.log(this.pickupSchedule);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
