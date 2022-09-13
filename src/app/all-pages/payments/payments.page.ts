import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController, ModalController} from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
import { UpiPage } from '../upi/upi.page';
import { BankPage } from '../bank/bank.page';



@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {

  constructor(
    public api: ApiService,
    public router: Router,
    private location:Location,
    private util:UtilService,
    private alertController: AlertController,
    private modalCtrl: ModalController
    
  ) { }

  ngOnInit() {
  }

  async openBankTransfar(){
    const modal = await this.modalCtrl.create({
      component: BankPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
    }
  }

  async openUpi(){
    const modal = await this.modalCtrl.create({
      component: UpiPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
    }
  }

  openMobileTransfar(){

  }
  

}
