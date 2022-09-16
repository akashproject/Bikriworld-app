import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';

@Component({
  selector: 'app-upi',
  templateUrl: './upi.page.html',
  styleUrls: ['./upi.page.scss'],
})
export class UpiPage implements OnInit {
  upi : any = JSON.parse(localStorage.getItem("payment"))
  constructor(
    public api: ApiService,
    private location:Location,
    public router: Router,
    private util:UtilService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  saveUpi(){
    return this.modalCtrl.dismiss(null, 'confirm');
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
