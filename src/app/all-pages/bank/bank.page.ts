import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.page.html',
  styleUrls: ['./bank.page.scss'],
})
export class BankPage implements OnInit {

  bankAccount : any = JSON.parse(localStorage.getItem("payment"))
  constructor(
    public api: ApiService,
    private location:Location,
    public router: Router,
    private util:UtilService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  saveBankAccount(){
    this.util.presentLoading(); 
    this.bankAccount.token = btoa(this.bankAccount.user_id);
    this.api.post('api/save-bank-account', this.bankAccount).subscribe((data: any) => {
      this.util.hideLoading();
      localStorage.setItem("payment",JSON.stringify(data))
      this.util.presentToast("Bank details has been saved successfully")
      return this.modalCtrl.dismiss(null, 'confirm');
    }, error => {
      this.util.hideLoading();
      this.util.presentToast("Unable to save address! Please try again")
    });
    
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
