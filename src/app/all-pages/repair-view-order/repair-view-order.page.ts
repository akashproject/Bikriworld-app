import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../../all-services/api.service';
import { UtilService } from 'src/app/all-services/util.service';
import { CancelReasonPage } from '../cancel-reason/cancel-reason.page';

@Component({
  selector: 'app-repair-view-order',
  templateUrl: './repair-view-order.page.html',
  styleUrls: ['./repair-view-order.page.scss'],
})
export class RepairViewOrderPage implements OnInit {

  userInfo : any = JSON.parse(localStorage.getItem("user"))
  loc : any;
  order : any = {};
  mediaUrl :any;
  constructor(public api: ApiService,
    private location:Location,
    public router: Router,
    private util:UtilService,
    private modalCtrl: ModalController
    ) { 
      this.mediaUrl = this.api.mediaURL;
      this.loc = this.location.getState(); 
      this.viewOrder(this.loc.order_id)
    }

  ngOnInit() {
   
    
  }

  async modalCancelOrder(){    
    const modal = await this.modalCtrl.create({
      component: CancelReasonPage,
      componentProps: { order_id: this.order.order_id }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.order.status = "cancelled"
    }
  }

  viewOrder(order_id){
    this.util.presentLoading();
    this.api.get('api/view-repair-order/'+order_id).subscribe((data: any) => {
      this.order = data;
      this.util.hideLoading();
    });
  }

  updateOrder(){
    this.router.navigate(['/update-order'], {state : {order_id :this.order.order_id}});
  }

}
