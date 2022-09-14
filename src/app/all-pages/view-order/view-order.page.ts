import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
import { CancelReasonPage } from '../cancel-reason/cancel-reason.page';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.page.html',
  styleUrls: ['./view-order.page.scss'],
})
export class ViewOrderPage implements OnInit {
  userInfo : any = JSON.parse(localStorage.getItem("user"))
  loc : any;
  order : any = {};
  constructor(public api: ApiService,
    private location:Location,
    public router: Router,
    private util:UtilService,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    this.loc = this.location.getState(); 
    this.order = this.loc.order;
    console.log(this.order);
    //this.viewOrder()
    
  }

  async modalCancelOrder(){
    console.log(this.order.id);
    
    const modal = await this.modalCtrl.create({
      component: CancelReasonPage,
      componentProps: { order_id: this.order.id }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.order.status = "cancelled"
    }
  }


}
