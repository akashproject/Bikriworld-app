import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController, ModalController} from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
import { UpiPage } from '../upi/upi.page';
import { BankPage } from '../bank/bank.page';
import { MobileTransfarPage } from '../mobile-transfar/mobile-transfar.page';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {
  payments : any = [];
  loc : any;
  payements : any;
  userInfo : any = JSON.parse(localStorage.getItem("user"))
  constructor(
    public api: ApiService,
    public router: Router,
    private location:Location,
    private util:UtilService,
    private alertController: AlertController,
    private modalCtrl: ModalController
    
  ) { }

  ngOnInit() {
    this.getPayment()
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

  async openMobileTransfar(){
    const modal = await this.modalCtrl.create({
      component: MobileTransfarPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
    }
  }

  getPayment(){
    this.util.presentLoading(); 
    let param = {
      "token":btoa(this.userInfo.id),
    }
    this.api.post('api/payments', param).subscribe((data: any) => {
      localStorage.setItem("payment",JSON.stringify(data))
      this.util.hideLoading();
    }, error => {

    });
  }
  

}
