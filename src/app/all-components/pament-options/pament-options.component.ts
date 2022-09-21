import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController ,ModalController } from '@ionic/angular';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
import { PickupOptionsComponent } from '../../all-components/pickup-options/pickup-options.component';

@Component({
  selector: 'app-pament-options',
  templateUrl: './pament-options.component.html',
  styleUrls: ['./pament-options.component.scss'],
})
export class PamentOptionsComponent implements OnInit {

  disableBtn = true
  constructor(
    public api: ApiService,
    private location:Location,
    public router: Router,
    private util:UtilService,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  changePaymentOption(payemnt_option){
    localStorage.setItem("payment_mode",payemnt_option)
    this.disableBtn = false
  }

  async selectPaymentOption(){
    this.modalCtrl.dismiss(null, 'confirm');
    const modal = await this.modalCtrl.create({
      component: PickupOptionsComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
