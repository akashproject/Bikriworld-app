import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController ,ModalController } from '@ionic/angular';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
import { PickupOptionsComponent } from '../../all-components/pickup-options/pickup-options.component';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {
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
    this.router.navigate(['/pickup']);
  }
}
